const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const { works } = require('./insertdb.js')
async function run () {
  // promise API
  const { body } = await client.search({
    index: 'works',
      type:'_doc',
      body: {
        query: {
          match: { age: 31 }
        }
      }

  })
  //console.log(body);
 console.log(body.hits.hits)
}
async function create() {
  await client.index({
index: 'works',
type:'_doc',
 body: {
                    "title": tag.tags.title,
                    "artist":  tag.tags.artist,
                }  })

  await client.indices.refresh({ index: 'works' })

}


create();
// console.log(run().catch);
