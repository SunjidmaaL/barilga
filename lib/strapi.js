const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://effortless-luck-023aebe70f.strapiapp.com';
const API_TOKEN = process.env.STRAPI_API_TOKEN; // Server-side only


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
    const res = await fetch(`${API_URL}/api/news2?populate=*&sort=publishedAt:desc`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    
    if (!res.ok) {
      console.error('Failed to fetch news:', res.status, res.statusText);
      throw new Error(`Failed to fetch news: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      console.warn('No news data received from API');
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNewsById(id) {
  try {
    const res = await fetch(`${API_URL}/api/news2/${id}?populate=*`);
    if (!res.ok) throw new Error('Failed to fetch news item');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
}

// Training API functions
export async function getTrainings() {
  try {
    // Fetch without sort first to avoid 400 errors
    const res = await fetch(`${API_URL}/api/trainings?populate=*`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch trainings:', res.status, res.statusText);
      throw new Error(`Failed to fetch trainings: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      console.warn('No training data received from API');
      return [];
    }
    
    // Sort client-side by createdAt (most recent first)
    const sortedData = data.data.sort((a, b) => {
      try {
        const aDate = a.attributes?.createdAt || a.createdAt || a.attributes?.date || a.date || '';
        const bDate = b.attributes?.createdAt || b.createdAt || b.attributes?.date || b.date || '';
        
        if (!aDate || !bDate) return 0;
        
        return new Date(bDate).getTime() - new Date(aDate).getTime();
      } catch (e) {
        return 0;
      }
    });
    
    return sortedData;
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return [];
  }
}

export async function getTrainingAnkets() {
  try {
    const res = await fetch(`${API_URL}/api/training-ankets?populate=*`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      // Don't throw error, just log it and return null
      console.warn(`Cannot fetch training ankets: ${res.status} ${res.statusText}. This is expected if training-ankets content type doesn't exist in Strapi yet.`);
      return null;
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data || !data.data.length) {
      console.warn('No training ankets data received from API');
      return null;
    }
    
    // Return the first active anket file
    return data.data[0];
  } catch (error) {
    console.warn('Error fetching training ankets:', error.message);
    return null;
  }
}

export async function getTrainingById(id) {
  try {
    const res = await fetch(`${API_URL}/api/trainings/${id}?populate=*`);
    if (!res.ok) throw new Error('Failed to fetch training item');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching training item:', error);
    return null;
  }
}


// Contacts API functions
export async function getContacts() {
  try {
    // Use no-store for development, revalidate for production
    const cacheOption = process.env.NODE_ENV === 'development' 
      ? { cache: 'no-store' } 
      : { next: { revalidate: 60 } };
    
    console.log('Fetching contacts from:', `${API_URL}/api/contacts?populate=*`);
    
    const res = await fetch(`${API_URL}/api/contacts?populate=*`, cacheOption);
    
    if (!res.ok) {
      console.error('Failed to fetch contacts:', res.status, res.statusText);
      console.error('API URL:', API_URL);
      console.error('Response headers:', Object.fromEntries(res.headers.entries()));
      throw new Error(`Failed to fetch contacts: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Contacts API response:', data);
    
    if (!data || !data.data) {
      console.warn('No contacts data received from API. Response structure:', data);
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    console.error('API URL:', API_URL);
    console.error('Error details:', error.message);
    return null;
  }
}

export async function getContactsHrs() {
  try {
    // Use no-store for development, revalidate for production
    const cacheOption = process.env.NODE_ENV === 'development' 
      ? { cache: 'no-store' } 
      : { next: { revalidate: 60 } };
    
    const res = await fetch(`${API_URL}/api/contact-hrs?populate=*&sort=order:asc`, cacheOption);
    
    if (!res.ok) {
      console.error('Failed to fetch contacts hrs:', res.status, res.statusText);
      throw new Error(`Failed to fetch contacts hrs: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data || !data.data) {
      console.warn('No contacts hrs data received from API');
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching contacts hrs:', error);
    return null;
  }
} 

export async function getContactsHrsById(id) {
  try {
    const res = await fetch(`${API_URL}/api/contacts-hrs/${id}?populate=*`);
    if (!res.ok) throw new Error('Failed to fetch contacts hrs item');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching contacts hrs by id:', error);
    return null;
  }
}

// Training registration API function
export async function submitTrainingRegistration(formData) {
  try {
    const res = await fetch(`${API_URL}/api/training-registrations`, {
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
      console.error('Failed to submit training registration:', res.status, res.statusText);
      throw new Error(`Failed to submit training registration: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error submitting training registration:', error);
    throw error;
  }
}

// Licenses API functions
export async function getLicenses() {
  try {
    const res = await fetch(`${API_URL}/api/licenses?populate=*&sort=issueDate:desc`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch licenses:', res.status, res.statusText);
      throw new Error(`Failed to fetch licenses: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      console.warn('No licenses data received from API');
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return [];
  }
}

export async function getLicenseById(id) {
  try {
    const res = await fetch(`${API_URL}/api/licenses/${id}?populate=*`);
    if (!res.ok) throw new Error('Failed to fetch license item');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching license item:', error);
    return null;
  }
}


// Law API functions
export async function getLaws() {
  try {
    // Use a safe populate that works whether or not a relation exists
    // Avoid over-populating unknown fields which can cause 400 responses
    const res = await fetch(`${API_URL}/api/laws?populate=*`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch laws:', res.status, res.statusText);
      throw new Error(`Failed to fetch laws: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      console.warn('No laws data received from API');
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching laws:', error);
    return [];
  }
}

export async function getLawById(id) {
  try {
    const res = await fetch(`${API_URL}/api/laws/${id}?populate=*`);
    if (!res.ok) throw new Error('Failed to fetch law item');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching law item:', error);
    return null;
  }
}

// Slides API functions
export async function getSlides() {
  try {
    const res = await fetch(`${API_URL}/api/slides?populate=*&sort[0]=order:asc`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch slides:', res.status, res.statusText);
      throw new Error(`Failed to fetch slides: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      console.warn('No slides data received from API');
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching slides:', error);
    return [];
  }
}

// Expert Team API functions
export async function getExpertTeams() {
  try {
    const res = await fetch(`${API_URL}/api/expert-teams?populate=*&sort[0]=order:asc`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch expert teams:', res.status, res.statusText);
      throw new Error(`Failed to fetch expert teams: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      console.warn('No expert teams data received from API');
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching expert teams:', error);
    return [];
  }
}

// Expert Team Images API functions (fallback)
export async function getExpertTeamImages() {
  try {
    const res = await fetch(`${API_URL}/api/expert-team-images?populate=*&sort[0]=order:asc`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch expert team images:', res.status, res.statusText);
      throw new Error(`Failed to fetch expert team images: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      console.warn('No expert team images data received from API');
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching expert team images:', error);
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