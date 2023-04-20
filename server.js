const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');
  
const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  /* (in Utils.js) const getRandomElement = arr => {
    if (!Array.isArray(arr)) throw new Error('Expected an array');
    return arr[Math.floor(Math.random() * arr.length)];
  } */
  
  app.get('/api/quotes/random', (req, res, next) => {
    const getRandomQuote = getRandomElement(quotes)
    res.send({
      quote: getRandomQuote
    });
  });
  // gets a random quote, from the quote: key, returns a random element from the quotes array

  app.get('/api/quotes', (req, res, next) => {
    if (req.query.person === undefined) {
        res.send({quotes: quotes})
    } else {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person)
        res.send({quotes: quotesByPerson})
    }
  });
  // above, if no .person key in the query, returns all the quotes array, if not filters through quotes, and it the quote/items person key is the same as the .person key in the query, includes it and sends it back

  app.post('/api/quotes', (req, res, next) => {
    const receivedQuote = {quote: req.query.quote, person: req.query.person}
    if (receivedQuote) {
      quotes.push(receivedQuote)
      res.send({quote: receivedQuote});
    } else {
      res.status(400).send()
    }
  });
  // above, takes the .quote and .person keys from req.query, and creates a new quote object, which is then pushed into quotes and sent, with the quote being the new object

  app.put('/api/quotes', (req, res, next) => {
    const receivedIndex = {id: req.query.id}
    const receivedQuote = {quote: req.query.quote, person: req.query.person}
    quotes.push(receivedQuote[receivedIndex])
    res.send(quotes[receivedIndex]);
  });

  // ** untested api! idea to take the index, and received quote / person value pair, then push the receivedQuote into the quotes array at at received index, replacing the current object
  
  