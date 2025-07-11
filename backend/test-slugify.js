const slugify = require('slugify');

const title = 'Unique Test Post 123';
const slug = slugify(title, { 
  lower: true, 
  strict: true,
  remove: /[*+~.()'"!:@]/g
});

console.log('Title:', title);
console.log('Slug:', slug); 