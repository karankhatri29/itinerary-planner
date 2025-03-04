/**
 * Service to handle operations related to transportation
 */
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRANSPORTATION_FILE = path.join(__dirname, '../data/transportation.json');

class TransportationService {
  /**
   * Get all transportation options
   * @returns {Promise<Array>} List of all transportation options
   */
  static async getAllTransportationOptions() {
    try {
      const data = await fs.readFile(TRANSPORTATION_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading transportation options:', error);
      return [];
    }
  }

  /**
   * Get transportation options for a specific location and number of people
   * @param {string} location - The location name
   * @param {number} numberOfPeople - Number of people requiring transport
   * @returns {Promise<Object>} Best transportation option available
   */
  static async getTransportationOptions(location, numberOfPeople) {
    try {
      const allOptions = await this.getAllTransportationOptions();
      const locationOptions = allOptions.find(
        (opt) => opt.location.toLowerCase() === location.toLowerCase()
      );

      if (!locationOptions) {
        console.warn(`No specific transportation found for "${location}". Using default options.`);
        return this.getDefaultTransportation(numberOfPeople);
      }

      let options = locationOptions.options.filter(
        (opt) => opt.maxCapacity >= numberOfPeople
      );

      // If no suitable options, pick the largest available
      if (options.length === 0) {
        options = [...locationOptions.options].sort(
          (a, b) => b.maxCapacity - a.maxCapacity
        );
      }

      if (options.length === 0) {
        console.warn(`No valid transport options available for "${location}". Using default options.`);
        return this.getDefaultTransportation(numberOfPeople);
      }

      const bestOption = options[0];
      const vehiclesNeeded = Math.ceil(numberOfPeople / bestOption.maxCapacity);

      return {
        type: bestOption.type,
        provider: bestOption.provider,
        capacity: bestOption.maxCapacity,
        vehicles: vehiclesNeeded,
        dailyCost: bestOption.dailyRate * vehiclesNeeded,
        contactInfo: bestOption.contactInfo,
        bookingInfo: bestOption.bookingInfo,
      };
    } catch (error) {
      console.error(`Error finding transportation for "${location}":`, error);
      return this.getDefaultTransportation(numberOfPeople);
    }
  }

  /**
   * Get default transportation when specific options are unavailable
   * @param {number} numberOfPeople - Number of people requiring transport
   * @returns {Object} Default transportation option
   */
  static getDefaultTransportation(numberOfPeople) {
    const defaultOptions = [
      { maxPeople: 4, type: 'Taxi', provider: 'Local Taxi Service', cost: 2000 },
      { maxPeople: 12, type: 'Tempo Traveller', provider: 'Regional Transport Service', cost: 4500 },
    ];

    let bestOption = defaultOptions.find((opt) => numberOfPeople <= opt.maxPeople);

    if (!bestOption) {
      const vehicles = Math.ceil(numberOfPeople / 12);
      bestOption = { type: 'Tempo Traveller', provider: 'Regional Transport Service', cost: 4500, vehicles };
    } else {
      bestOption.vehicles = 1;
    }

    return {
      type: bestOption.type,
      provider: bestOption.provider,
      capacity: bestOption.maxPeople || 12,
      vehicles: bestOption.vehicles,
      dailyCost: bestOption.cost * bestOption.vehicles,
      contactInfo: 'Contact local travel agency',
      bookingInfo: 'Advance booking recommended',
    };
  }
}

export default TransportationService;
