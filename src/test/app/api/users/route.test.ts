import { describe, test, expect, afterAll, jest } from '@jest/globals';

// Import the functions after mocking
import { GET } from '@/app/api/users/route';

describe('Users API Endpoint', () => {
 
  afterAll(() => {
    // Cleanup
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    test('should return an Ok response', async () => {
     
      const response = await GET();

      expect(response.status).toBe(200);
    });

    test('should return data with length greater than 0', async () => {
     
      // Act
      const response = await GET();
      const data = await response.json();

      // Assert
      expect(data.length).toBeGreaterThan(0);
    });

    
  });


});
