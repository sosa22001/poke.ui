import settings from "@/lib/settings";

export async function getReports() {
    try {
      const response = await fetch(`${settings.URL}/api/request`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log("API Response (GET):", data) // Para depurar la estructura de datos

      return Array.isArray(data) ? data : data.results || data.data || []
    } catch (error) {
      console.error("Error fetching reports:", error)
      throw error
    }
  }

  export async function createReport(pokemonType, sampleSize) {
    const body = {
      pokemon_type: pokemonType,
    };
  
    if (sampleSize && sampleSize > 0) {
      body.sample_size = sampleSize;
    }
  
    const response = await fetch(`http://127.0.0.1:8000/api/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  
    return await response.json();
  }
  

export async function deleteReport(reportId) {
  try {
    const response = await fetch(`${settings.URL}/api/request/${reportId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting report:", error);
    throw error;
  }
}