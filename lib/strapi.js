const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
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

export async function getCompany() {
  try {
    const res = await fetch(`${API_URL}/api/company?populate=*`);
    if (!res.ok) throw new Error('Failed to fetch company');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching company:', error);
    return null;
  }
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

export async function getFeaturedNews() {
  try {
    const res = await fetch(`${API_URL}/api/news2?populate=*&filters[featured][$eq]=true&sort=publishedAt:desc`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    if (!res.ok) throw new Error('Failed to fetch featured news');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching featured news:', error);
    return [];
  }
}

// Training API functions
export async function getTrainings() {
  try {
    const res = await fetch(`${API_URL}/api/trainings?populate=*&sort=date:asc`, {
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
    
    return data.data;
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return [];
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

export async function getUpcomingTrainings() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const res = await fetch(`${API_URL}/api/trainings?populate=*&filters[date][$gte]=${today}&sort=date:asc`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    if (!res.ok) throw new Error('Failed to fetch upcoming trainings');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching upcoming trainings:', error);
    return [];
  }
}

// Categories API functions
export async function getCategories() {
  try {
    const res = await fetch(`${API_URL}/api/categories?populate=*&sort=order:asc`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status, res.statusText);
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data || !data.data) {
      console.warn('No categories data received from API');
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getFeaturedCategories() {
  try {
    const res = await fetch(`${API_URL}/api/categories?populate=*&filters[featured][$eq]=true&sort=order:asc`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch featured categories:', res.status, res.statusText);
      throw new Error(`Failed to fetch featured categories: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data || !data.data) {
      console.warn('No featured categories data received from API');
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching featured categories:', error);
    return [];
  }
}

// Contacts API functions
export async function getContacts() {
  try {
    const res = await fetch(`${API_URL}/api/contacts?populate=*`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch contacts:', res.status, res.statusText);
      throw new Error(`Failed to fetch contacts: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data || !data.data) {
      console.warn('No contacts data received from API');
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return null;
  }
}

export async function submitContactForm(formData) {
  try {
    const res = await fetch(`${API_URL}/api/contact-messages`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        data: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          status: 'new'
        }
      })
    });
    
    if (!res.ok) {
      console.error('Failed to submit contact form:', res.status, res.statusText);
      throw new Error(`Failed to submit contact form: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
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

// Projects API functions
export async function getProjects() {
  try {
    const res = await fetch(`${API_URL}/api/projects?populate=*&sort[0]=order:asc&sort[1]=createdAt:desc`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      console.error('Failed to fetch projects:', res.status, res.statusText);
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Check if data exists and has the expected structure
    if (!data || !data.data) {
      console.warn('No projects data received from API');
      return [];
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    // Try multiple endpoints to find published projects with order sorting
    const endpoints = [
      // Try with publishedAt filter and order sorting
      `${API_URL}/api/projects?populate=*&filters[featured][$eq]=true&filters[publishedAt][$notNull]=true&sort[0]=order:asc&sort[1]=createdAt:desc`,
      // Try with featured filter and order sorting
      `${API_URL}/api/projects?populate=*&filters[featured][$eq]=true&sort[0]=order:asc&sort[1]=createdAt:desc`,
      // Try with publishedAt filter and order sorting
      `${API_URL}/api/projects?populate=*&filters[publishedAt][$notNull]=true&sort[0]=order:asc&sort[1]=createdAt:desc`,
      // Try all projects with order sorting
      `${API_URL}/api/projects?populate=*&sort[0]=order:asc&sort[1]=createdAt:desc`
    ];

    for (let i = 0; i < endpoints.length; i++) {
      const endpoint = endpoints[i];
      console.log(`Trying endpoint ${i + 1}/${endpoints.length}:`, endpoint);
      
      try {
        const res = await fetch(endpoint, {
          next: { revalidate: 300 } // Revalidate every 5 minutes
        });
        
        console.log(`Response status for endpoint ${i + 1}:`, res.status);
        
        if (!res.ok) {
          console.error(`Failed to fetch from endpoint ${i + 1}:`, res.status, res.statusText);
          continue;
        }
        
        const data = await res.json();
        console.log(`API response from endpoint ${i + 1}:`, data);
        
        if (data && data.data && data.data.length > 0) {
          console.log(`✅ Found ${data.data.length} projects from endpoint ${i + 1}`);
          return data.data;
        } else {
          console.log(`❌ No data found in endpoint ${i + 1}`);
        }
      } catch (err) {
        console.error(`Error fetching from endpoint ${i + 1}:`, err);
        continue;
      }
    }
    
    console.warn('No projects found from any endpoint');
    return [];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export async function getProjectById(id) {
  try {
    const res = await fetch(`${API_URL}/api/projects/${id}?populate=*`);
    if (!res.ok) throw new Error('Failed to fetch project');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
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
    const res = await fetch(`${API_URL}/api/laws?populate=*&sort=publishedAt:desc`, {
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

// Test function to check API connectivity
export async function testProjectsAPI() {
  try {
    console.log('Testing projects API connectivity...');
    console.log('API_URL:', API_URL);
    
    const res = await fetch(`${API_URL}/api/projects?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Test response status:', res.status);
    console.log('Test response headers:', Object.fromEntries(res.headers.entries()));
    
    if (!res.ok) {
      console.error('API test failed:', res.status, res.statusText);
      const errorText = await res.text();
      console.error('Error response:', errorText);
      return { success: false, error: `HTTP ${res.status}: ${res.statusText}` };
    }
    
    const data = await res.json();
    console.log('API test successful. Data structure:', {
      hasData: !!data.data,
      dataLength: data.data?.length || 0,
      sampleItem: data.data?.[0] || null
    });
    
    return { success: true, data: data };
  } catch (error) {
    console.error('API test error:', error);
    return { success: false, error: error.message };
  }
}