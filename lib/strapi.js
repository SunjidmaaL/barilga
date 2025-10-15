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
