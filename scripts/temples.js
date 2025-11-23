const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
document.getElementById('lastModified').textContent = document.lastModified;

const menuButton = document.getElementById('menu-button');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open');

  if (nav.classList.contains('open')) {
    menuButton.textContent = 'X'
  } else {
    menuButton.textContent = '☰'
  }
})


const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Add more temple objects here...
  {
    templeName: "Toronto Ontario",
    location: "Toronto, Ontario",
    dedicated: "1990, August 25-27",
    area: 55558,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/toronto-ontario-temple/toronto-ontario-temple-57469-main.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October 27-29",
    area: 53997,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340-main.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, 30 October–2 November",
    area: 59246,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
  }
];

function createTempleCard(temple) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} Temple`;
  img.loading = 'lazy';

  const figcaption = document.createElement('figcaption');
  figcaption.innerHTML = `
    <strong>${temple.templeName}</strong><br>
    Location:  ${temple.location}<br>
    Dedicated: ${temple.dedicated}<br>
    Area: ${temple.area.toLocaleString()} sq ft
  `;

  figure.appendChild(figcaption);
  figure.appendChild(img);
  
  return figure;
}

function displayTemples(filteredTemples) {
  const main = document.querySelector('main');
  const h2 = main.querySelector('h2');
  main.innerHTML = '';
  main.appendChild(h2);

  filteredTemples.forEach(temple => {
    const card = createTempleCard(temple);
    main.appendChild(card);
  });
}

function filterTemples(query) {
  const filterTemples = ['New', 'Old', 'Large', 'Small']
  if (!filterTemples.includes(query)) {
    document.querySelector('h2').textContent = 'Home';
    displayTemples(temples)
    return;
  }

  const filtered = temples.filter(t => {
    const year = parseInt(t.dedicated.match(/^\d{4}/))
    const area = t.area;

    if (query == 'New') {
      return year > 2000;
    } else if (query == 'Old') {
      return year < 1900
    } else if (query == 'Large') {
      return area > 90000
    } else if (query == 'Small') {
      return area < 10000
    }
  })

  document.querySelector('h2').textContent = query;
  displayTemples(filtered)
}

const navLinks = document.querySelectorAll('nav a');
navLinks[0].addEventListener('click', () => {
  filterTemples()
});

navLinks[1].addEventListener('click', () => {
  filterTemples('Old')
});

navLinks[2].addEventListener('click', () => {
  filterTemples('New')
});

navLinks[3].addEventListener('click', () => {
  filterTemples('Large')
});

navLinks[4].addEventListener('click', () => {
  filterTemples('Small')
});

filterTemples()