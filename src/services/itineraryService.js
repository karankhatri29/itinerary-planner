import { v4 as uuidv4 } from 'uuid';
import LocationService from './locationService.js';
import TransportationService from './transportationService.js';

const itineraries = {};

class ItineraryService {
  static async generateItinerary({ startDate, endDate, location, budget, numberOfPeople, preferences }) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const tripDuration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const locationInfo = await LocationService.getLocationByName(location);
    if (!locationInfo) throw new Error(`Location "${location}" not found`);

    const attractions = await LocationService.getAttractionsByPreference(location, preferences);
    const dailyBudget = budget / tripDuration;
    const transportation = await TransportationService.getTransportationOptions(location, numberOfPeople);
    const dailyPlans = this.generateDailyPlans(attractions, tripDuration, dailyBudget, transportation);
    
    const itinerary = {
      id: uuidv4(),
      startDate,
      endDate,
      location,
      budget,
      numberOfPeople,
      preferences,
      dailyPlans,
      totalCost: this.calculateTotalCost(dailyPlans),
      createdAt: new Date().toISOString()
    };

    itineraries[itinerary.id] = itinerary;
    return itinerary;
  }

  static generateDailyPlans(attractions, tripDuration, dailyBudget, transportation) {
    const dailyPlans = [];
    const sortedAttractions = [...attractions].sort((a, b) => b.rating - a.rating);
    const attractionsPerDay = Math.ceil(sortedAttractions.length / tripDuration);

    for (let day = 0; day < tripDuration; day++) {
      const dayAttractions = sortedAttractions.slice(day * attractionsPerDay, (day + 1) * attractionsPerDay);
      const attractionCosts = dayAttractions.reduce((sum, attr) => sum + attr.cost, 0);
      const transportationCost = transportation.dailyCost;
      const mealCost = this.calculateMealCost(dayAttractions);
      const totalDayCost = attractionCosts + transportationCost + mealCost;

      dailyPlans.push({
        day: day + 1,
        date: this.addDays(new Date(transportation.startDate), day).toISOString().split('T')[0],
        attractions: dayAttractions,
        transportation: { ...transportation, dailyCost: transportationCost },
        meals: this.recommendMeals(dayAttractions),
        costs: { attractions: attractionCosts, transportation: transportationCost, meals: mealCost, total: totalDayCost },
        schedule: this.createSchedule(dayAttractions)
      });
    }
    return dailyPlans;
  }

  static calculateMealCost(attractions) {
    return (3 - attractions.filter(attr => attr.includesMeal).length) * 500;
  }

  static recommendMeals() {
    return [
      { type: 'breakfast', name: 'Local South Indian Breakfast', cost: 200 },
      { type: 'lunch', name: 'Thali Meal', cost: 350 },
      { type: 'dinner', name: 'Seafood Dinner', cost: 450 }
    ];
  }

  static createSchedule(attractions) {
    let currentTime = new Date();
    currentTime.setHours(8, 0, 0, 0);
    
    return [
      { time: this.formatTime(currentTime), activity: 'Breakfast', duration: 60 },
      ...attractions.map(attraction => {
        currentTime = this.addMinutes(currentTime, attraction.duration || 120);
        return { time: this.formatTime(currentTime), activity: attraction.name, duration: attraction.duration || 120 };
      })
    ];
  }

  static formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  static addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  static addDays(date, days) {
    return new Date(date.setDate(date.getDate() + days));
  }

  static calculateTotalCost(dailyPlans) {
    return dailyPlans.reduce((sum, day) => sum + day.costs.total, 0);
  }

  static async getItineraryById(id) {
    return itineraries[id] || null;
  }
}

export default ItineraryService;
