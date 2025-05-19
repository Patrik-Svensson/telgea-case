import axios from 'axios';

export async function fetchSubscriberDataUsage(): Promise<string> {
  try {
    const response = await axios.get('http://localhost:3000/data-usage-mock');
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch subscriber data usage: ${(error as Error).message}`
    );
  }
}
