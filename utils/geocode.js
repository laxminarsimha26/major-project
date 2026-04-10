const geocode = async (location) => {
    const res = await fetch(
        `https://api.maptiler.com/geocoding/${location}.json?key=${process.env.MAP_TOKEN}`
    );

    const data = await res.json();

    if (!data.features || data.features.length === 0) {
        throw new Error("Location not found");
    }

    return data.features[0].center; // [lng, lat]
};

module.exports = geocode;