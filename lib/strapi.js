const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://effortless-luck-023aebe70f.strapiapp.com';
const API_TOKEN = process.env.STRAPI_API_TOKEN; // Server-side only

// Debug: Log API configuration (only in development or if explicitly enabled)
if (process.env.NODE_ENV === 'development' || process.env.DEBUG_STRAPI === 'true') {
  console.log('[Strapi Config] API_URL:', API_URL);
  console.log('[Strapi Config] API_TOKEN:', API_TOKEN ? '***SET***' : 'NOT SET');
}

// Simple in-memory cache for errors to prevent console spam during development
const errorCache = new Map();
const ERROR_CACHE_TTL = 60000; // 1 minute - errors are cached to prevent spam

// Fetch timeout in milliseconds (30 seconds for Strapi cold starts)
// Strapi cloud free tier дээр service эхлэхэд удаан байж болно
const FETCH_TIMEOUT = 30000;

// Retry configuration for "service starting" issues
const MAX_RETRIES = 2; // 2 удаа retry (нийт 3 удаа оролдоно)
const RETRY_DELAY = 5000; // 5 секунд завсар

// Cache settings for production (in seconds)
// Development: 0 (no cache for fresh data)
// Production: Longer cache times to reduce API calls
// IMPORTANT: These values control how often Next.js revalidates cached data
// Higher values = fewer API calls but potentially stale data
const CACHE_SETTINGS = {
  // Frequently updated content (news, trainings)
  // Changed from 2 hours to 24 hours to reduce API calls
  FREQUENT: process.env.NODE_ENV === 'development' ? 0 : 86400, // 24 hours (was 7200)
  // Moderately updated content (laws, licenses, foreign relations)
  // Changed from 4 hours to 48 hours to reduce API calls
  MODERATE: process.env.NODE_ENV === 'development' ? 0 : 172800, // 48 hours (was 14400)
  // Rarely updated content (contacts, expert teams, slides)
  // Changed from 24 hours to 7 days to reduce API calls
  RARE: process.env.NODE_ENV === 'development' ? 0 : 604800, // 7 days (was 86400)
};

// Helper function to create fetch with timeout
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Only log errors, not successful requests
    if (process.env.NODE_ENV === 'development') {
      if (error.name === 'AbortError') {
        console.error(`[Strapi] Request timeout after ${FETCH_TIMEOUT}ms: ${url}`);
      } else {
        console.error(`[Strapi] Fetch error: ${url}`, error);
      }
    }
    
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${FETCH_TIMEOUT}ms`);
    }
    throw error;
  }
}

// Helper function to fetch with retry for "service starting" issues
// Зөвхөн 503 (Service Unavailable) болон timeout-д retry хийх
async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options);
      
      // 503 Service Unavailable бол retry хийх (Strapi service эхлэж байна)
      if (response.status === 503 && attempt < retries) {
        if (process.env.NODE_ENV === 'development' || process.env.DEBUG_STRAPI === 'true') {
          console.warn(`[Strapi] Service starting (503), retrying in ${RETRY_DELAY / 1000}s... (attempt ${attempt + 1}/${retries + 1})`);
        }
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
        continue;
      }
      
      return response;
    } catch (error) {
      // Timeout эсвэл network error бол retry хийх
      const isRetryableError = 
        error.message.includes('timeout') || 
        error.name === 'AbortError' ||
        error.message.includes('ECONNREFUSED') ||
        error.message.includes('ENOTFOUND');
      
      if (isRetryableError && attempt < retries) {
        if (process.env.NODE_ENV === 'development' || process.env.DEBUG_STRAPI === 'true') {
          console.warn(`[Strapi] Request failed, retrying in ${RETRY_DELAY / 1000}s... (attempt ${attempt + 1}/${retries + 1})`);
        }
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
        continue;
      }
      
      // Last attempt failed эсвэл non-retryable error
      throw error;
    }
  }
  
  // Should not reach here
  throw new Error('Max retries exceeded');
}

// Helper function to get headers with authentication
function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (API_TOKEN) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
  }
  
  return headers;
}

// News API functions
export async function getNews() {
  try {
    // Try populate query first (faster - single request instead of two)
    let url = `${API_URL}/api/news2?populate=*&sort=publishedAt:desc`;
    let res = await fetchWithRetry(url, {
      next: { revalidate: CACHE_SETTINGS.FREQUENT }
    });
    
    let data = null;
    
    // If populate query works, use it directly
    if (res.ok) {
      try {
      data = await res.json();
      } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
          console.warn('[Strapi] News populate query: JSON parse failed, trying fallback');
        }
      }
    } else {
      // Populate query failed, log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Strapi] News populate query failed: ${res.status} ${res.statusText}, trying simple query`);
      }
    }
    
    // Fallback to simple query if populate failed or no data
    if (!res.ok || !data || !data.data) {
      url = `${API_URL}/api/news2`;
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.FREQUENT }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
        } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
            console.error('[Strapi] News: JSON parse failed on simple query:', parseError);
        }
      }
    } else {
        // Both queries failed
        const errorKey = 'news:400';
        const lastErrorTime = errorCache.get(errorKey);
        const now = Date.now();
        
        if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`[Strapi] News: Both queries failed. Last status: ${res.status} ${res.statusText}`);
            console.error(`[Strapi] News: URL: ${url}`);
            console.error(`[Strapi] News: Check Strapi permissions and content type 'news2'`);
          }
          errorCache.set(errorKey, now);
      }
      return [];
      }
    }
    
    if (!data || !data.data) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Strapi] News: No data returned from API');
      }
      return [];
    }
    
    return data.data;
  } catch (error) {
    // Log errors with more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Strapi] Error fetching news:', error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return [];
  }
}

export async function getNewsById(id) {
  try {
    // Try populate query first (faster - single request with all data)
    let url = `${API_URL}/api/news2/${id}?populate=*`;
    let res = await fetchWithRetry(url, {
      next: { revalidate: CACHE_SETTINGS.FREQUENT },
      headers: getHeaders()
    });
    
    let data = null;
    
    // If populate query works, use it directly
    if (res.ok) {
    try {
      data = await res.json();
      } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] News ${id} populate query: JSON parse failed, trying fallback`);
        }
      }
    } else {
      // Populate query failed, log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Strapi] News ${id} populate query failed: ${res.status} ${res.statusText}, trying simple query`);
      }
    }
    
    // Fallback to simple query if populate failed
    if (!res.ok || !data || !data.data) {
      url = `${API_URL}/api/news2/${id}`;
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.FREQUENT },
      headers: getHeaders()
    });
    
      if (res.ok) {
        try {
          data = await res.json();
        } catch (parseError) {
            if (process.env.NODE_ENV === 'development') {
            console.error(`[Strapi] News ${id}: JSON parse failed on simple query:`, parseError);
          }
        }
      }
    }
    
    // If still no data, try to find in news list as last resort
    if ((!res.ok || !data || !data.data) && (res.status === 404 || res.status === 400)) {
      const errorKey = `news-${id}:${res.status}`;
      const lastErrorTime = errorCache.get(errorKey);
      const now = Date.now();
      
      // Only try list fallback if we haven't logged this error recently
      if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
      try {
        const allNews = await getNews();
        if (allNews && Array.isArray(allNews)) {
          const foundNews = allNews.find((item) => {
            const itemId = item.id?.toString();
            const itemDocId = item.documentId?.toString();
            const searchId = id.toString();
            return itemId === searchId || itemDocId === searchId;
          });
          
          if (foundNews) {
            // Try to fetch by documentId if it exists and is different from id
            if (foundNews.documentId && foundNews.documentId.toString() !== id.toString()) {
                url = `${API_URL}/api/news2/${foundNews.documentId}?populate=*`;
              const resByDocId = await fetchWithRetry(url, {
                  next: { revalidate: CACHE_SETTINGS.FREQUENT },
        headers: getHeaders()
      });
              
              if (resByDocId.ok) {
                try {
                  const docIdData = await resByDocId.json();
                  data = docIdData;
                } catch (docIdError) {
                    // Silent error handling
                }
              }
            }
            
            // If we still don't have data from API, use the found news item from list
            if (!data && foundNews) {
              return foundNews;
            }
          }
        }
      } catch (listError) {
          // Silent error handling for fallback
      }
      
      if (!data) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] News item ${id} not found (${res.status})`);
          }
          errorCache.set(errorKey, now);
        }
      }
      
      if (!data) {
        return null;
      }
      }
      
    // Check if we have valid data structure
    if (!data) {
      return null;
    }
    
    // Handle different response structures
    let newsItem = null;
    if (data.data) {
      newsItem = data.data;
    } else if (data.attributes) {
      // Data might be the item itself with attributes
      newsItem = data;
    } else if (data.id) {
      // Data might be directly the news item
      newsItem = data;
    }
    
    if (!newsItem) {
      return null;
    }
    
    return newsItem;
  } catch (error) {
    // Only log errors
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Strapi] Error fetching news item ${id}:`, error);
    }
    return null;
  }
}

// Training API functions
export async function getTrainings() {
  try {
    // Try populate query first (faster - single request instead of two)
    let url = `${API_URL}/api/trainings?populate=*`;
    let res = await fetchWithRetry(url, {
      next: { revalidate: CACHE_SETTINGS.FREQUENT }
    });
    
    let data = null;
    
    // If populate query works, use it directly
    if (res.ok) {
      try {
      data = await res.json();
      } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
          console.warn('[Strapi] Trainings populate query: JSON parse failed, trying fallback');
        }
      }
    } else {
      // Populate query failed, log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Strapi] Trainings populate query failed: ${res.status} ${res.statusText}, trying simple query`);
      }
    }
    
    // Fallback to simple query if populate failed or no data
    if (!res.ok || !data || !data.data) {
      url = `${API_URL}/api/trainings`;
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.FREQUENT }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
        } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
            console.error('[Strapi] Trainings: JSON parse failed on simple query:', parseError);
        }
      }
    } else {
        // Both queries failed
        const errorKey = 'trainings:400';
        const lastErrorTime = errorCache.get(errorKey);
        const now = Date.now();
        
        if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`[Strapi] Trainings: Both queries failed. Last status: ${res.status} ${res.statusText}`);
            console.error(`[Strapi] Trainings: URL: ${url}`);
            console.error(`[Strapi] Trainings: Check Strapi permissions and content type 'trainings'`);
          }
          errorCache.set(errorKey, now);
      }
      return [];
      }
    }
    
    if (!data || !data.data) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Strapi] Trainings: No data returned from API');
      }
      return [];
    }
    
    // Sort client-side by createdAt (most recent first) if needed
    if (data.data && data.data.length > 0) {
      data.data.sort((a, b) => {
      try {
        const aDate = a.attributes?.createdAt || a.createdAt || a.attributes?.date || a.date || '';
        const bDate = b.attributes?.createdAt || b.createdAt || b.attributes?.date || b.date || '';
        if (!aDate || !bDate) return 0;
        return new Date(bDate).getTime() - new Date(aDate).getTime();
        } catch {
        return 0;
      }
    });
    }
    
    return data.data;
  } catch (error) {
    // Log errors with more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Strapi] Error fetching trainings:', error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return [];
  }
}

export async function getTrainingById(id) {
  try {
    // Try populate query first (faster - single request with all data)
    let url = `${API_URL}/api/trainings/${id}?populate=*`;
    let res = await fetchWithRetry(url, {
      next: { revalidate: CACHE_SETTINGS.FREQUENT },
      headers: getHeaders()
    });
    
    let data = null;
    
    // If populate query works, use it directly
    if (res.ok) {
    try {
      data = await res.json();
      } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] Training ${id} populate query: JSON parse failed, trying fallback`);
        }
      }
    } else {
      // Populate query failed, log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Strapi] Training ${id} populate query failed: ${res.status} ${res.statusText}, trying simple query`);
      }
    }
    
    // Fallback to simple query if populate failed
    if (!res.ok || !data || !data.data) {
      url = `${API_URL}/api/trainings/${id}`;
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.FREQUENT },
          headers: getHeaders()
        });
        
      if (res.ok) {
        try {
          data = await res.json();
        } catch (parseError) {
            if (process.env.NODE_ENV === 'development') {
            console.error(`[Strapi] Training ${id}: JSON parse failed on simple query:`, parseError);
          }
        }
      }
    }
    
    // If still no data, try to find in trainings list as last resort
    if ((!res.ok || !data || !data.data) && (res.status === 404 || res.status === 400)) {
      const errorKey = `training-${id}:${res.status}`;
      const lastErrorTime = errorCache.get(errorKey);
      const now = Date.now();
      
      // Only try list fallback if we haven't logged this error recently
      if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
      try {
        const allTrainings = await getTrainings();
        if (allTrainings && Array.isArray(allTrainings)) {
          const foundTraining = allTrainings.find((item) => {
            const itemId = item.id?.toString();
            const itemDocId = item.documentId?.toString();
            const searchId = id.toString();
            return itemId === searchId || itemDocId === searchId;
          });
          
          if (foundTraining) {
            // Try to fetch by documentId if it exists and is different from id
            if (foundTraining.documentId && foundTraining.documentId.toString() !== id.toString()) {
                url = `${API_URL}/api/trainings/${foundTraining.documentId}?populate=*`;
              const resByDocId = await fetchWithRetry(url, {
                  next: { revalidate: CACHE_SETTINGS.FREQUENT },
                headers: getHeaders()
              });
              
              if (resByDocId.ok) {
                try {
                  const docIdData = await resByDocId.json();
                  data = docIdData;
                } catch (docIdError) {
                    // Silent error handling
                }
              }
            }
            
            // If we still don't have data from API, use the found training item from list
            if (!data && foundTraining) {
              return foundTraining;
            }
          }
        }
      } catch (listError) {
          // Silent error handling for fallback
      }
      
      if (!data) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] Training item ${id} not found (${res.status})`);
          }
          errorCache.set(errorKey, now);
        }
      }
      
      if (!data) {
      return null;
      }
    }
    
    // Check if we have valid data structure
    if (!data) {
      return null;
    }
    
    // Handle different response structures
    let trainingItem = null;
    if (data.data) {
      trainingItem = data.data;
    } else if (data.attributes) {
      // Data might be the item itself with attributes
      trainingItem = data;
    } else if (data.id || data.documentId) {
      // Data might be directly the training item
      trainingItem = data;
    }
    
    if (!trainingItem) {
      return null;
    }
    
    return trainingItem;
  } catch (error) {
    // Only log errors
      if (process.env.NODE_ENV === 'development') {
      console.error(`[Strapi] Error fetching training item ${id}:`, error);
      }
      return null;
  }
}

export async function getTrainingAnkets() {
  try {
    let data = null;
    let res = null;
    
    // Try multiple populate syntaxes (Strapi v4/v5 compatibility)
    const populateUrls = [
      `${API_URL}/api/training-ankets?populate=*`, // Populate all fields
      `${API_URL}/api/training-ankets?populate[file]=*`, // Populate file field (v4 syntax)
      `${API_URL}/api/training-ankets?populate[0]=file`, // Populate file field (alternative v4 syntax)
      `${API_URL}/api/training-ankets?populate[file][populate]=*`, // Nested populate
    ];
    
    // Try each populate syntax
    for (const url of populateUrls) {
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
          // Check if we got data with file information
          if (data && data.data && data.data.length > 0) {
            const firstItem = data.data[0];
            const attrs = firstItem.attributes || firstItem;
            const hasFile = attrs?.file || firstItem.file;
            
            if (hasFile) {
              break; // Found working populate syntax
            }
          }
        } catch (parseError) {
          // Continue to next URL
    if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] Training ankets: JSON parse failed for ${url}`);
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] Training ankets: Populate query failed (${res.status}): ${url}`);
        }
      }
    }
    
    // If no populate query worked, try fetching by ID with populate (using documentId from simple query)
    if (!data || !data.data || !data.data.length || !(data.data[0].attributes?.file || data.data[0].file)) {
      // First get the item ID
      let simpleRes = await fetchWithRetry(`${API_URL}/api/training-ankets`, {
        next: { revalidate: CACHE_SETTINGS.MODERATE }
      });
      
      if (simpleRes.ok) {
        try {
          const simpleData = await simpleRes.json();
          if (simpleData && simpleData.data && simpleData.data.length > 0) {
            const item = simpleData.data[0];
            const itemId = item.documentId || item.id;
            
            if (itemId) {
              // Try fetching by ID with populate
              const idPopulateUrls = [
                `${API_URL}/api/training-ankets/${itemId}?populate=*`,
                `${API_URL}/api/training-ankets/${itemId}?populate[file]=*`,
                `${API_URL}/api/training-ankets/${itemId}?populate[0]=file`,
              ];
              
              for (const url of idPopulateUrls) {
                res = await fetchWithRetry(url, {
                  next: { revalidate: CACHE_SETTINGS.MODERATE },
                  headers: getHeaders()
                });
                
                if (res.ok) {
                  try {
                    const idData = await res.json();
                    if (idData && (idData.data || idData.attributes || idData.id)) {
                      // Check if it has file
                      const itemData = idData.data || idData;
                      const itemAttrs = itemData.attributes || itemData;
                        if (itemAttrs?.file || itemData.file) {
                          // Convert single item response to array format for consistency
                          data = { data: [itemData] };
                          break;
                        }
                    }
                  } catch (parseError) {
                    // Continue
                  }
                }
              }
            }
            
            // If still no file, use simple data but log warning
            if (!data || !data.data || !data.data.length || !(data.data[0].attributes?.file || data.data[0].file)) {
              data = simpleData;
              if (process.env.NODE_ENV === 'development') {
                console.warn('[Strapi] Training ankets: Fetched data but file field is not populated. Data structure:', data.data[0]);
              }
            }
          }
        } catch (parseError) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Strapi] Training ankets: Error parsing simple query:', parseError);
          }
        }
      }
    }
    
    // Final check
    if (!data || !data.data || !data.data.length) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Strapi] Training ankets: No data returned from API after all attempts');
      }
      return null;
    }
    
    return data.data[0];
  } catch (error) {
    // Log errors with more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Strapi] Error fetching training ankets:', error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return null;
  }
}


// Contacts API functions
export async function getContacts() {
  try {
    let data = null;
    let res = null;
    
    // Try multiple populate syntaxes (Strapi v4/v5 compatibility)
    const populateUrls = [
      `${API_URL}/api/contacts?populate=*`, // Populate all fields
      `${API_URL}/api/contacts`, // Simple query without populate
      `${API_URL}/api/contacts?fields[0]=address&fields[1]=phone&fields[2]=email&fields[3]=fax&fields[4]=website`, // Specific fields
    ];
    
    // Try each query syntax
    for (const url of populateUrls) {
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.RARE }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
          // Check if we got data
          if (data && data.data && data.data.length > 0) {
            break; // Found working query
          }
        } catch (parseError) {
          // Continue to next URL
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] Contacts: JSON parse failed for ${url}`);
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] Contacts: Query failed (${res.status}): ${url}`);
        }
      }
    }
    
    // Final check
    if (!data || !data.data || !data.data.length) {
      const errorKey = 'contacts:error';
      const lastErrorTime = errorCache.get(errorKey);
      const now = Date.now();
      
      if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[Strapi] Contacts: All queries failed. Last status: ${res?.status || 'unknown'} ${res?.statusText || ''}`);
          console.error(`[Strapi] Contacts: Check Strapi permissions and content type 'contacts'`);
          console.error(`[Strapi] Contacts: Make sure the content type exists and has 'find' permission for Public role`);
        }
          errorCache.set(errorKey, now);
        }
      return null;
    }
    
    return data.data;
  } catch (error) {
    // Log errors with more details in development
      if (process.env.NODE_ENV === 'development') {
      console.error('[Strapi] Error fetching contacts:', error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return null;
  }
}

export async function getContactsHrs() {
  try {
    let data = null;
    let res = null;
    
    // Try multiple query syntaxes
    const queryUrls = [
      `${API_URL}/api/contact-hrs?populate=*&sort=order:asc`, // Populate all with sort
      `${API_URL}/api/contact-hrs?populate=*`, // Populate all
      `${API_URL}/api/contact-hrs?sort=order:asc`, // Simple query with sort
      `${API_URL}/api/contact-hrs`, // Simple query without sort
    ];
    
    // Try each query syntax
    for (const url of queryUrls) {
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.RARE }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
          // Check if we got data
          if (data && data.data && data.data.length > 0) {
            break; // Found working query
          }
        } catch (parseError) {
          // Continue to next URL
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] Contact hours: JSON parse failed for ${url}`);
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] Contact hours: Query failed (${res.status}): ${url}`);
        }
      }
    }
    
    // Final check
    if (!data || !data.data || !data.data.length) {
      const errorKey = 'contact-hrs:error';
      const lastErrorTime = errorCache.get(errorKey);
      const now = Date.now();
      
      if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[Strapi] Contact hours: All queries failed. Last status: ${res?.status || 'unknown'} ${res?.statusText || ''}`);
          console.error(`[Strapi] Contact hours: Check Strapi permissions and content type 'contact-hrs'`);
          console.error(`[Strapi] Contact hours: Make sure the content type exists and has 'find' permission for Public role`);
        }
          errorCache.set(errorKey, now);
      }
      return null;
    }
    
    return data.data;
  } catch (error) {
    // Log errors with more details in development
      if (process.env.NODE_ENV === 'development') {
      console.error('[Strapi] Error fetching contact hours:', error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return null;
  }
} 

export async function getContactsHrsById(id) {
  try {
    // Try without any query parameters first
    let res = await fetchWithRetry(`${API_URL}/api/contact-hrs/${id}`, {
      next: { revalidate: CACHE_SETTINGS.RARE }
    });
    
    // Only retry on 500 errors, not on 400/404
    if (!res.ok && res.status === 500) {
      res = await fetchWithRetry(`${API_URL}/api/contact-hrs/${id}?fields[0]=name&fields[1]=phone&fields[2]=order`, {
        next: { revalidate: CACHE_SETTINGS.RARE }
      });
    }
    
    if (!res.ok) {
      // Only log 500+ errors (server errors), 400/404 are expected (permissions/content not found)
      if (process.env.NODE_ENV === 'development' && res.status >= 500) {
        console.warn(`[Strapi API] Contact hrs item ${id}: ${res.status} ${res.statusText}`);
      }
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching contacts hrs by id:', error);
    }
    return null;
  }
}

// Training registration API function
export async function submitTrainingRegistration(formData) {
  try {
    const res = await fetchWithRetry(`${API_URL}/api/training-registrations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          position: formData.position,
          trainingTitle: formData.trainingTitle,
          status: 'new',
          registeredAt: new Date().toISOString()
        }
      })
    });
    
    if (!res.ok) {
      const errorMessage = `Failed to submit training registration: ${res.status} ${res.statusText}`;
      if (process.env.NODE_ENV === 'development') {
        console.error(errorMessage);
      }
      throw new Error(errorMessage);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    // Only log in development, but still throw error for API route to handle
    if (process.env.NODE_ENV === 'development') {
      console.error('Error submitting training registration:', error);
    }
    throw error;
  }
}

// Licenses API functions
export async function getLicenses() {
  try {
    let data = null;
    let res = null;
    
    // Try multiple populate syntaxes (Strapi v4/v5 compatibility)
    const populateUrls = [
      `${API_URL}/api/licenses?populate=*&sort=issueDate:desc`, // Populate all fields
      `${API_URL}/api/licenses?populate[file]=*&sort=issueDate:desc`, // Populate file field (v4 syntax)
      `${API_URL}/api/licenses?populate[0]=file&sort=issueDate:desc`, // Populate file field (alternative v4 syntax)
      `${API_URL}/api/licenses?sort=issueDate:desc`, // Simple query with sort
      `${API_URL}/api/licenses`, // Simple query without sort
    ];
    
    // Try each populate syntax
    for (const url of populateUrls) {
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
          // Check if we got data
          if (data && data.data && data.data.length > 0) {
            break; // Found working query
          }
        } catch (parseError) {
          // Continue to next URL
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] Licenses: JSON parse failed for ${url}`);
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] Licenses: Query failed (${res.status}): ${url}`);
        }
      }
    }
    
    // Final check
    if (!data || !data.data || !data.data.length) {
      const errorKey = 'licenses:error';
      const lastErrorTime = errorCache.get(errorKey);
      const now = Date.now();
      
      if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[Strapi] Licenses: All queries failed. Last status: ${res?.status || 'unknown'} ${res?.statusText || ''}`);
          console.error(`[Strapi] Licenses: Check Strapi permissions and content type 'licenses'`);
          console.error(`[Strapi] Licenses: Make sure the content type exists and has 'find' permission for Public role`);
        }
        errorCache.set(errorKey, now);
      }
      return [];
    }
    
    return data.data;
  } catch (error) {
    // Log errors with more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Strapi] Error fetching licenses:', error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return [];
  }
}

export async function getLicenseById(id) {
  try {
    let data = null;
    let res = null;
    
    // Try multiple populate syntaxes (Strapi v4/v5 compatibility)
    const populateUrls = [
      `${API_URL}/api/licenses/${id}?populate=*`, // Populate all fields
      `${API_URL}/api/licenses/${id}?populate[file]=*`, // Populate file field (v4 syntax)
      `${API_URL}/api/licenses/${id}?populate[0]=file`, // Populate file field (alternative v4 syntax)
    ];
    
    // Try each populate syntax
    for (const url of populateUrls) {
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE },
        headers: getHeaders()
      });
      
      if (res.ok) {
        try {
          data = await res.json();
          // Check if we got data
          if (data && (data.data || data.attributes || data.id)) {
            break; // Found working populate syntax
          }
        } catch (parseError) {
          // Continue to next URL
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] License ${id}: JSON parse failed for ${url}`);
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] License ${id}: Populate query failed (${res.status}): ${url}`);
        }
      }
    }
    
    // Fallback to simple query if populate failed
    if (!res.ok || !data || (!data.data && !data.attributes && !data.id)) {
      const url = `${API_URL}/api/licenses/${id}`;
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE },
        headers: getHeaders()
      });
      
      if (res.ok) {
        try {
          data = await res.json();
        } catch (parseError) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`[Strapi] License ${id}: JSON parse failed on simple query:`, parseError);
          }
        }
      } else {
        const errorKey = `license-${id}:${res.status}`;
        const lastErrorTime = errorCache.get(errorKey);
        const now = Date.now();
        
        if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
          if (process.env.NODE_ENV === 'development') {
            if (res.status === 400 || res.status === 404) {
              console.warn(`[Strapi] License ${id} not found (${res.status})`);
            } else if (res.status >= 500) {
              console.error(`[Strapi] License ${id}: Server error (${res.status})`);
            }
          }
          errorCache.set(errorKey, now);
      }
      return null;
    }
    }
    
    // Handle different response structures
    if (!data) {
      return null;
    }
    
    // Return data in consistent format
    if (data.data) {
    return data.data;
    } else if (data.attributes || data.id) {
      return data;
    }
    
    return null;
  } catch (error) {
    // Log errors with more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Strapi] Error fetching license ${id}:`, error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return null;
  }
}


// Law API functions
export async function getLaws() {
  try {
    let data = null;
    let res = null;
    
    // Try multiple populate syntaxes (Strapi v4/v5 compatibility)
    const populateUrls = [
      `${API_URL}/api/laws?populate=*`, // Populate all fields
      `${API_URL}/api/laws?populate[file]=*`, // Populate file field (v4 syntax)
      `${API_URL}/api/laws?populate[0]=file`, // Populate file field (alternative v4 syntax)
      `${API_URL}/api/laws?populate[file][populate]=*`, // Nested populate
    ];
    
    // Try each populate syntax
    for (const url of populateUrls) {
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
          // Check if we got data with file information
          if (data && data.data && data.data.length > 0) {
            const firstItem = data.data[0];
            const attrs = firstItem.attributes || firstItem;
            const hasFile = attrs?.file || firstItem.file;
            
            if (hasFile || data.data.length > 0) {
              break; // Found working populate syntax
            }
          }
        } catch (parseError) {
          // Continue to next URL
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] Laws: JSON parse failed for ${url}`);
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] Laws: Populate query failed (${res.status}): ${url}`);
        }
      }
    }
    
    // Fallback to simple query if populate failed or no data
    if (!data || !data.data || !data.data.length) {
      const url = `${API_URL}/api/laws`;
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
        } catch (parseError) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Strapi] Laws: JSON parse failed on simple query:', parseError);
          }
        }
      } else {
        // Both queries failed
        const errorKey = 'laws:error';
        const lastErrorTime = errorCache.get(errorKey);
        const now = Date.now();
        
        if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`[Strapi] Laws: Both queries failed. Last status: ${res.status} ${res.statusText}`);
            console.error(`[Strapi] Laws: URL: ${url}`);
            console.error(`[Strapi] Laws: Check Strapi permissions and content type 'laws'`);
            console.error(`[Strapi] Laws: Make sure the content type exists and has 'find' permission for Public role`);
          }
          errorCache.set(errorKey, now);
      }
      return [];
      }
    }
    
    // Check if data exists and has the expected structure
    if (!data || !data.data || !data.data.length) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Strapi] Laws: No data returned from API');
      }
      return [];
    }
    
    return data.data;
  } catch (error) {
    // Log errors with more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Strapi] Error fetching laws:', error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return [];
  }
}

export async function getLawById(id) {
  try {
    let data = null;
    let res = null;
    
    // Try multiple populate syntaxes (Strapi v4/v5 compatibility)
    const populateUrls = [
      `${API_URL}/api/laws/${id}?populate=*`, // Populate all fields
      `${API_URL}/api/laws/${id}?populate[file]=*`, // Populate file field (v4 syntax)
      `${API_URL}/api/laws/${id}?populate[0]=file`, // Populate file field (alternative v4 syntax)
    ];
    
    // Try each populate syntax
    for (const url of populateUrls) {
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE },
        headers: getHeaders()
      });
      
      if (res.ok) {
        try {
          data = await res.json();
          // Check if we got data
          if (data && (data.data || data.attributes || data.id)) {
            break; // Found working populate syntax
          }
        } catch (parseError) {
          // Continue to next URL
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] Law ${id}: JSON parse failed for ${url}`);
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] Law ${id}: Populate query failed (${res.status}): ${url}`);
        }
      }
    }
    
    // Fallback to simple query if populate failed
    if (!res.ok || !data || (!data.data && !data.attributes && !data.id)) {
      const url = `${API_URL}/api/laws/${id}`;
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE },
        headers: getHeaders()
      });
      
      if (res.ok) {
        try {
          data = await res.json();
        } catch (parseError) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`[Strapi] Law ${id}: JSON parse failed on simple query:`, parseError);
          }
        }
      } else {
        const errorKey = `law-${id}:${res.status}`;
        const lastErrorTime = errorCache.get(errorKey);
        const now = Date.now();
        
        if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
          if (process.env.NODE_ENV === 'development') {
            if (res.status === 400 || res.status === 404) {
              console.warn(`[Strapi] Law ${id} not found (${res.status})`);
            } else if (res.status >= 500) {
              console.error(`[Strapi] Law ${id}: Server error (${res.status})`);
            }
          }
          errorCache.set(errorKey, now);
      }
      return null;
    }
    }
    
    // Handle different response structures
    if (!data) {
      return null;
    }
    
    // Return data in consistent format
    if (data.data) {
    return data.data;
    } else if (data.attributes || data.id) {
      return data;
    }
    
    return null;
  } catch (error) {
    // Log errors with more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Strapi] Error fetching law ${id}:`, error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return null;
  }
}

// Slides API functions
export async function getSlides() {
  try {
    // Try populate query first (faster - single request instead of two)
    let url = `${API_URL}/api/slides?populate=*`;
    let res = await fetchWithRetry(url, {
      next: { revalidate: CACHE_SETTINGS.RARE }
    });
    
    let data = null;
    
    // If populate query works, use it directly
    if (res.ok) {
      try {
      data = await res.json();
      } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
          console.warn('[Strapi] Slides populate query: JSON parse failed, trying fallback');
        }
      }
    } else {
      // Populate query failed, log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[Strapi] Slides populate query failed: ${res.status} ${res.statusText}, trying simple query`);
      }
    }
    
    // Fallback to simple query if populate failed or no data
    if (!res.ok || !data || !data.data) {
      url = `${API_URL}/api/slides`;
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.RARE }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
          if (process.env.NODE_ENV === 'development' && data && data.data) {
            console.log(`[Strapi] Slides: Fetched ${data.data.length} items using simple query`);
          }
        } catch (parseError) {
      if (process.env.NODE_ENV === 'development') {
            console.error('[Strapi] Slides: JSON parse failed on simple query:', parseError);
        }
      }
    } else {
        // Both queries failed
        const errorKey = 'slides:400';
        const lastErrorTime = errorCache.get(errorKey);
        const now = Date.now();
        
        if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`[Strapi] Slides: Both queries failed. Last status: ${res.status} ${res.statusText}`);
            console.error(`[Strapi] Slides: URL: ${url}`);
            console.error(`[Strapi] Slides: Check Strapi permissions and content type 'slides'`);
          }
          errorCache.set(errorKey, now);
      }
      return [];
      }
    }
    
    if (!data || !data.data) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Strapi] Slides: No data returned from API');
      }
      return [];
    }
    
    return data.data;
  } catch (error) {
    // Log errors with more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Strapi] Error fetching slides:', error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return [];
  }
}

// Expert Team API functions
export async function getExpertTeams() {
  try {
    // Try with specific image populate first
    let res = await fetchWithRetry(`${API_URL}/api/expert-teams?populate[image]=*&sort[0]=order:asc`, {
      next: { revalidate: CACHE_SETTINGS.RARE }
    });
    
    // Only retry on 500 errors, not on 400/404
    if (!res.ok && res.status === 500) {
      res = await fetchWithRetry(`${API_URL}/api/expert-teams?sort[0]=order:asc`, {
        next: { revalidate: CACHE_SETTINGS.RARE }
      });
    }
    
    if (!res.ok) {
      // Only log 500+ errors (server errors), 400/404 are expected (permissions/content type issues)
      if (process.env.NODE_ENV === 'development' && res.status >= 500) {
        console.warn(`[Strapi API] Expert teams: ${res.status} ${res.statusText}`);
      }
      return [];
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      // Silently return empty array if no data
      return [];
    }
    
    return data.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching expert teams:', error);
    }
    return [];
  }
}

// Expert Team Images API functions (fallback)
export async function getExpertTeamImages() {
  try {
    // Try with specific image populate first
    let res = await fetchWithRetry(`${API_URL}/api/expert-team-images?populate[image]=*&sort[0]=order:asc`, {
      next: { revalidate: CACHE_SETTINGS.RARE }
    });
    
    // Only retry on 500 errors, not on 400/404
    if (!res.ok && res.status === 500) {
      res = await fetchWithRetry(`${API_URL}/api/expert-team-images?sort[0]=order:asc`, {
        next: { revalidate: CACHE_SETTINGS.RARE }
      });
    }
    
    if (!res.ok) {
      // Only log 500+ errors (server errors), 400/404 are expected (permissions/content type issues)
      if (process.env.NODE_ENV === 'development' && res.status >= 500) {
        console.warn(`[Strapi API] Expert team images: ${res.status} ${res.statusText}`);
      }
      return [];
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      // Silently return empty array if no data
      return [];
    }
    
    return data.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching expert team images:', error);
    }
    return [];
  }
}

// Foreign Relations Images API functions
export async function getForeignRelationsImages() {
  try {
    let data = null;
    let res = null;
    
    // Try multiple populate syntaxes (Strapi v4/v5 compatibility)
    const populateUrls = [
      `${API_URL}/api/foreign-relations?populate=*`, // Populate all fields
      `${API_URL}/api/foreign-relations?populate[image]=*`, // Populate image field (v4 syntax)
      `${API_URL}/api/foreign-relations?populate[picture]=*`, // Populate picture field (alternative field name)
      `${API_URL}/api/foreign-relations?populate[images]=*`, // Populate images field (plural)
      `${API_URL}/api/foreign-relations?populate[0]=image`, // Populate image field (alternative v4 syntax)
      `${API_URL}/api/foreign-relations?populate[image][populate]=*`, // Nested populate
    ];
    
    // Try each populate syntax
    for (const url of populateUrls) {
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
          // Check if we got data with image information
          if (data && data.data && data.data.length > 0) {
            const firstItem = data.data[0];
            const attrs = firstItem.attributes || firstItem;
            const hasImage = attrs?.image || attrs?.picture || attrs?.images || firstItem.image || firstItem.picture || firstItem.images;
            
            if (hasImage || data.data.length > 0) {
              break; // Found working populate syntax
            }
          }
        } catch (parseError) {
          // Continue to next URL
          if (process.env.NODE_ENV === 'development') {
            console.warn(`[Strapi] Foreign relations: JSON parse failed for ${url}`);
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Strapi] Foreign relations: Populate query failed (${res.status}): ${url}`);
        }
      }
    }
    
    // Fallback to simple query if populate failed or no data
    if (!data || !data.data || !data.data.length) {
      const url = `${API_URL}/api/foreign-relations`;
      res = await fetchWithRetry(url, {
        next: { revalidate: CACHE_SETTINGS.MODERATE }
      });
      
      if (res.ok) {
        try {
          data = await res.json();
        } catch (parseError) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Strapi] Foreign relations: JSON parse failed on simple query:', parseError);
          }
        }
      } else {
        // Both queries failed
        const errorKey = 'foreign-relations:error';
        const lastErrorTime = errorCache.get(errorKey);
        const now = Date.now();
        
        if (!lastErrorTime || (now - lastErrorTime) > ERROR_CACHE_TTL) {
          if (process.env.NODE_ENV === 'development') {
            console.error(`[Strapi] Foreign relations: All queries failed. Last status: ${res?.status || 'unknown'} ${res?.statusText || ''}`);
            console.error(`[Strapi] Foreign relations: URL: ${url}`);
            console.error(`[Strapi] Foreign relations: Check Strapi permissions and content type 'foreign-relations'`);
            console.error(`[Strapi] Foreign relations: Make sure the content type exists and has 'find' permission for Public role`);
          }
          errorCache.set(errorKey, now);
      }
      return [];
      }
    }
    
    // Check if data exists and has the expected structure
    if (!data || !data.data || !data.data.length) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Strapi] Foreign relations: No data returned from API');
      }
      return [];
    }
    
    return data.data;
  } catch (error) {
    // Log errors with more details in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Strapi] Error fetching foreign relations images:', error);
      if (error instanceof Error) {
        console.error('[Strapi] Error message:', error.message);
      }
    }
    return [];
  }
}

// Helper function to get image URL
export function getImageUrl(image) {
  if (!image) return null;

  // Case 1: Direct media object { url: string }
  if (typeof image === 'object' && image.url) {
    return image.url.startsWith('http') ? image.url : `${API_URL}${image.url}`;
  }

  // Case 2: Strapi v4 relation { data: { attributes: { url } } }
  const nestedUrl = image?.data?.attributes?.url || image?.data?.url;
  if (nestedUrl) {
    return nestedUrl.startsWith('http') ? nestedUrl : `${API_URL}${nestedUrl}`;
  }

  // Case 3: Array relations (take first)
  const firstArrayItem = Array.isArray(image) ? image[0] : image?.data && Array.isArray(image.data) ? image.data[0] : null;
  const arrayUrl = firstArrayItem?.attributes?.url || firstArrayItem?.url;
  if (arrayUrl) {
    return arrayUrl.startsWith('http') ? arrayUrl : `${API_URL}${arrayUrl}`;
  }

  // Case 4: If caller accidentally passed the whole Strapi entity, try common paths
  const entityUrl = image?.attributes?.image?.data?.attributes?.url
    || image?.attributes?.image?.url
    || image?.attributes?.images?.data?.[0]?.attributes?.url
    || image?.attributes?.images?.[0]?.url;
  if (entityUrl) {
    return entityUrl.startsWith('http') ? entityUrl : `${API_URL}${entityUrl}`;
  }

  return null;
}