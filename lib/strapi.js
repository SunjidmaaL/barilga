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
