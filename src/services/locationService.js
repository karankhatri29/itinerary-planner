/**
 * Service to handle operations related to locations
 */
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCATIONS_FILE = path.join(__dirname, '../data/locations.json');

class LocationService {
  /**
   * Get all available locations
   * @returns {Promise<Array>} List of locations
   */
  static async getAllLocations() {
    try {
      const data = await fs.readFile(LOCATIONS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading locations:', error);
      return [];
    }
  }

  /**
   * Get location details by name
   * @param {string} name - Name of the location
   * @returns {Promise<Object|null>} Location details or null if not found
   */
  static async getLocationByName(name) {
    try {
      const locations = await this.getAllLocations();
      return locations.find(
        (location) => location.name.toLowerCase() === name.toLowerCase()
      ) || null;
    } catch (error) {
      console.error(`Error finding location "${name}":`, error);
      return null;
    }
  }

  /**
   * Get attractions by location and preference
   * @param {string} locationName - Name of the location
   * @param {Array<string>} preferences - List of preferences (e.g., ['museums', 'parks'])
   * @returns {Promise<Array>} List of attractions matching preferences
   */
  static async getAttractionsByPreference(locationName, preferences = []) {
    try {
      const location = await this.getLocationByName(locationName);
      if (!location) {
        console.warn(`No location found for "${locationName}".`);
        return [];
      }

      // If no specific preferences are provided, return all attractions
      if (!preferences || preferences.length === 0) {
        return Object.values(location).flat().filter(item => typeof item === 'string');
      }

      const attractions = [];
      preferences.forEach((preference) => {
        const key = preference.toLowerCase();
        if (location[key] && Array.isArray(location[key])) {
          attractions.push(...location[key]);
        }
      });

      return attractions;
    } catch (error) {
      console.error(`Error finding attractions for "${locationName}":`, error);
      return [];
    }
  }
}

export default LocationService;
