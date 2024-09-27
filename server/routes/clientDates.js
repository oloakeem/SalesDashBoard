const Client = require('../models/Client');

const getClientsByDateRange = async (days) => {
    const counts = [];
    let totalCount = 0; // Initialize a variable to hold the total count

    for (let i = 0; i < days; i++) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - (i + 1)); // Get date for each day
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1); // Get the next day for the range

        const count = await Client.countDocuments({
            startDate: { $gte: startDate, $lt: endDate } // Count clients added on this specific day
        });
        
        counts.push(count); // Push the count for this day into the array
        totalCount += count; // Add the daily count to the total count
    }

    return {
        dailyCounts: counts.reverse(), // Reverse the array so the oldest date is first
        totalCount // Return the total count
    };
};

module.exports = getClientsByDateRange;
