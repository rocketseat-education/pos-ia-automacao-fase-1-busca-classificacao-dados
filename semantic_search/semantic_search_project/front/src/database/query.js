export default async function query(collection, queryText){
const res = await collection.query({ queryTexts: queryText });
    const movies = [];

    const distances = res.distances[0].map(d => ((1-d)+1)/2);

    for (let i = 0; i < res.ids[0].length; i++) {
      movies.push({
        id: res.ids[0][i],
        distance: distances[i],
        title: res.metadatas[0][i].title,
        tags: res.metadatas[0][i].tags.split(", "),
        synopsis: res.metadatas[0][i].synopsis,
      });
    }

    return movies;
}
