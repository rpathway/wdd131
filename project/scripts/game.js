/////////////////////////////////////////
//             Site functions
//////////////////////////////////////////
function set_listeners() {
  const menuButton = document.getElementById('menuButton');
  const dropdown   = document.getElementById('dropdownMenu');
  const overlay    = document.getElementById('overlay');

  const feature_form         = document.querySelector('.feedback-modal');
  const feedbackType         = document.getElementById('feedback-type');
  const feedbackButton       = document.getElementById('feedback-button');
  const categorySelect       = document.getElementById('feedback-category');
  const feedbackCategoryCard = document.getElementById('feedback-category-card');

  menuButton.addEventListener('click', () => {
    dropdown.classList.toggle('active');
    if (!overlay.classList.contains('active')) {
      overlay.classList.toggle('active');
    }
  });

  // Close dropdown when clicked outside
  document.addEventListener('click', (e) => {
    if (!menuButton.contains(e.target) && !dropdown.contains(e.target) && !feature_form.contains(e.target)) {
      feature_form.classList.remove('active');
      dropdown.classList.remove('active');
      overlay.classList.remove('active');
    }
  });

  feedbackButton.addEventListener('click', () => {
    dropdown.classList.remove('active');
    feature_form.classList.toggle('active');
  });

  feedbackType.addEventListener('change', (e) => {
    const type = ['request', 'feedback']
    const selectionValue = e.target.value;

    if (!type.includes(selectionValue)) {
      feedbackCategoryCard.classList.add('show');
      categorySelect.required = true;
    } else if (type.includes(selectionValue)) {
      feedbackCategoryCard.classList.remove('show');
      categorySelect.required = false;
    }
  });
}

function inject_site_content() {
  const path = window.location.pathname;
  const form = document.querySelector('.feedback-modal');
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  const content = {
    "review_form": '<form action=submitted_form.html id=feedback-form><h1>Feedback form</h1><div class=feedback-card><label for=feedbackType>Feedback Type<span class=required-field>*</span></label> <select id=feedback-type name=feedbackType required><option disabled selected value="">Select feedback type...</select></div><div class=feedback-card id=feedback-category-card><label for=feedbackCategory>Category<span class=required-field>*</span></label> <select id=feedback-category name=feedbackCategory><option disabled selected value="">Select category type...</select></div><div class=feedback-card><label for=userName>Your Name</label> <input id=userName name=userName placeholder=Optional></div><div class=feedback-card><label for=userEmail>Your Email</label> <input id=userEmail name=userEmail placeholder=Optional@example.com></div><div class=feedback-card><label for=review>Review</label> <textarea id=review name=review placeholder="Share your thoughts with us"rows=5></textarea></div><input type=submit value="Submit Review"></form>',
    "header": '<nav class=navbar><div class=navbar-start><a href=dekiru.html><button id=homeButton><span><img alt="Home button"loading=lazy src=images/home-icon.webp></span></button></a></div><div class=navbar-center><span class=nav-title><h1>Dekiru</h1></span></div><div class=navbar-end><div class=dropdown><button id=menuButton><span><img alt="Menu button"loading=lazy src=images/hamburger-menu.webp></span></button><ul class=dropdown-menu id=dropdownMenu><li><p id=feedback-button>Feedback</ul></div></div></nav>',
    "footer": '<div class=footer-nav><div class="footer-item footer-start"><a href=lessons.html><button id=lessons-mobile-button><img alt="Lessons button"loading=lazy src=images/lessons.webp></button> </a><span>Lessons</span></div><div class="footer-item footer-center"><a href=dekiru.html><button id=home-mobile-button><img alt="Home button"loading=lazy src=images/home-icon.webp></button> </a><span>Home</span></div><div class="footer-item footer-end"><a href=alphabet.html><button id=alphabet-mobile-button><img alt="Alphabet button"loading=lazy src=images/alphabet-icon.webp></button> </a><span>Alphabet</span></div></div><div class=footer-info><p>© <span id=currentyear>2025</span> 🌐 Robbie Yamashita 🌐 Canada<p>Last Modification: <span id=lastModified></span></div>',
    "feedback-form": {
      'feature-type': [
        'Feature Request',
        'Bug Report',
        'Content Suggestion',
        'Content Correction',
        'General Feedback'
      ],
      'Category': [
        'Lessons',
        'Alphabet Practice',
        'Grammar',
        'UI/UX Design',
        'Performance'
      ],
    }
  }

  // Set general page content
  form.innerHTML = content.review_form;
  header.innerHTML = content.header;
  footer.innerHTML = content.footer;

  // Set feature content
  const feedbackType = document.getElementById('feedback-type');
  const categoryType = document.getElementById('feedback-category');
  const categoryContent = content["feedback-form"]["Category"]
  const feedbackContent = content["feedback-form"]["feature-type"]
  feedbackContent.forEach(feedbackOption => {
    const option = document.createElement('option');
    option.value = feedbackOption.split(' ')[1].toLowerCase();
    option.textContent = feedbackOption;

    feedbackType.appendChild(option);
  });
  categoryContent.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;

    categoryType.appendChild(option);
  });

  // Load specific page content
  if (path.includes('lessons.html')) {
    loadLessonsContent()
  } else if (path.includes('alphabet.html')) {
    load_alphabets();
  }
}

function set_card_listeners() {
  const path = window.location.pathname;
  if (!path.includes('dekiru.html')) return;

  const alphabet_card = document.querySelector('.alphabet-button');
  const ticker = document.getElementById('ticker');

  const join_arrays = (array) => {
    return Object.entries(array).map((e, i) => i > 0 ? e[1] : null).filter(n => n).flatMap(n => n).join('')
  }

  const characters = [join_arrays(HIRAGANA.GOJUON), join_arrays(KATAKANA.GOJUON)].join('')
  const total_spins = characters.length * 2;
  let current_char;
  let spins = 0;
  let index = 0;
  let timeout = null;

  const spinner = () => {
    current_char = characters[index];
    ticker.textContent = current_char;
    index = (index + 1) % characters.length;
    spins++;

    if (spins >= total_spins) return;

    const progress = spins / total_spins;
    const speed = 50 + (progress * 400);

    timeout = setTimeout(spinner, speed);
  }

  alphabet_card.addEventListener('mouseenter', () => {
    clearTimeout(timeout)
    spinner();
  }) 
  
  alphabet_card.addEventListener('mouseleave', () => {
    clearTimeout(timeout)
    spins = 0
    ticker.textContent = current_char
  })
}

/*****************************************
 *****************************************
 *             Game functions
 *****************************************
 *****************************************/
const HIRAGANA = {
  GOJUON: {
    SOKUON: Array.from('ぁぃぅぇぉっゃゅょゎ'),
    VOWELS: Array.from('あいうえお'),
    K_KANA: Array.from('かきくけこ'),
    S_KANA: Array.from('さしすせそ'),
    T_KANA: Array.from('たちつてと'),
    N_KANA: Array.from('なにぬねの'),
    H_KANA: Array.from('はひふへほ'),
    M_KANA: Array.from('まみむめも'),
    Y_KANA: Array.from('やゆよ'),
    R_KANA: Array.from('らりるれろ'),
    EXTRAS: ['わ','を','ん']
  },
  DAKUTEN: {
    G_KANA: Array.from('がぎぐげご'),
    Z_KANA: Array.from('ざじずぜぞ'),
    D_KANA: Array.from('だぢづでど'),
    B_KANA: Array.from('ばびぶべぼ')
  },
  HANDAKUTEN: {
    P_KANA: Array.from('ぱぴぷぺぽ')
  },
  ROMAJI: {
    GOJUON: {
      SOKUON: ['a', 'i', 'u', 'e', 'o', 'tsu', 'ya', 'yu', 'yo', 'wa'],
      VOWELS: ['a', 'i', 'u', 'e', 'o'],
      K_KANA: ['ka', 'ki', 'ku', 'ke', 'ko'],
      S_KANA: ['sa', 'shi', 'su', 'se', 'so'],
      T_KANA: ['ta', 'chi', 'tsu', 'te', 'to'],
      N_KANA: ['na', 'ni', 'nu', 'ne', 'no'],
      H_KANA: ['ha', 'hi', 'fu', 'he', 'ho'],
      M_KANA: ['ma', 'mi', 'mu', 'me', 'mo'],
      Y_KANA: ['ya', 'yu', 'yo'],
      R_KANA: ['ra', 'ri', 'ru', 're', 'ro'],
      EXTRAS: ['wa', 'wo', 'n']
    },
    DAKUTEN: {
      G_KANA: ['ga', 'gi', 'gu', 'ge', 'go'],
      Z_KANA: ['za', 'ji', 'zu', 'ze', 'zo'],
      D_KANA: ['da', 'ji', 'zu', 'de', 'do'],
      B_KANA: ['ba', 'bi', 'bu', 'be', 'bo']
    },
    HANDAKUTEN: {
      P_KANA: ['pa', 'pi', 'pu', 'pe', 'po']
    }
  }
};
const KATAKANA = {
  GOJUON: {
    SOKUON: Array.from('ァィゥェォッャュョヮ'),
    VOWELS: Array.from('アイウエオ'),
    K_KANA: Array.from('カキクケコ'),
    S_KANA: Array.from('サシスセソ'),
    T_KANA: Array.from('タチツテト'),
    N_KANA: Array.from('ナニヌネノ'),
    H_KANA: Array.from('ハヒフヘホ'),
    M_KANA: Array.from('マミムメモ'),
    Y_KANA: Array.from('ヤユヨ'),
    R_KANA: Array.from('ラリルレロ'),
    EXTRAS: ['ワ','ヲ','ン']
  },
  DAKUTEN: {
    G_KANA: Array.from('ガギグゲゴ'),
    Z_KANA: Array.from('ザジズゼゾ'),
    D_KANA: Array.from('ダヂヅデド'),
    B_KANA: Array.from('バビブベボ')
  },
  HANDAKUTEN: {
    P_KANA: Array.from('パピプペポ')
  },
  ROMAJI: {
    GOJUON: {
      SOKUON: ['a', 'i', 'u', 'e', 'o', 'tsu', 'ya', 'yu', 'yo', 'wa'],
      VOWELS: ['a', 'i', 'u', 'e', 'o'],
      K_KANA: ['ka', 'ki', 'ku', 'ke', 'ko'],
      S_KANA: ['sa', 'shi', 'su', 'se', 'so'],
      T_KANA: ['ta', 'chi', 'tsu', 'te', 'to'],
      N_KANA: ['na', 'ni', 'nu', 'ne', 'no'],
      H_KANA: ['ha', 'hi', 'fu', 'he', 'ho'],
      M_KANA: ['ma', 'mi', 'mu', 'me', 'mo'],
      Y_KANA: ['ya', 'yu', 'yo'],
      R_KANA: ['ra', 'ri', 'ru', 're', 'ro'],
      EXTRAS: ['wa', 'wo', 'n']
    },
    DAKUTEN: {
      G_KANA: ['ga', 'gi', 'gu', 'ge', 'go'],
      Z_KANA: ['za', 'ji', 'zu', 'ze', 'zo'],
      D_KANA: ['da', 'ji', 'zu', 'de', 'do'],
      B_KANA: ['ba', 'bi', 'bu', 'be', 'bo']
    },
    HANDAKUTEN: {
      P_KANA: ['pa', 'pi', 'pu', 'pe', 'po']
    }
  }
};
const LESSON_DATA = [
  {
    "id": 1,
    "title": "Basic Greetings",
    "particle": "は (wa)",
    "particleExplanation": "Marks the topic of the sentence",
    "phrases": [
      {
        "japanese": "こんにち<span class=\"particle\">は</span>",
        "romaji": "konnichiwa",
        "english": "Hello / Good afternoon",
        "breakdown": "こんにち (konnichi) + <span class=\"particle\">は</span> (wa)",
        "note": "は is part of the word, not marking a subject here"
      },
      {
        "japanese": "私<span class=\"particle\">は</span>学生です",
        "romaji": "watashi wa gakusei desu",
        "english": "I am a student",
        "breakdown": "私 (I) + <span class=\"particle\">は</span> (topic marker) + 学生 (student) + です (am/is)",
        "note": "は marks '私' as the topic being discussed"
      },
      {
        "japanese": "これ<span class=\"particle\">は</span>本です",
        "romaji": "kore wa hon desu",
        "english": "This is a book",
        "breakdown": "これ (this) + <span class=\"particle\">は</span> (topic marker) + 本 (book) + です (is)",
        "note": "は indicates we're talking about 'this'"
      }
    ]
  },
  {
    "id": 2,
    "title": "Questions",
    "particle": "か (ka)",
    "particleExplanation": "Turns statements into questions",
    "phrases": [
      {
        "japanese": '元気です<span class=\"particle\">か</span>',
        "romaji": "genki desu ka",
        "english": "Are you well? / How are you?",
        "breakdown": "元気 (healthy/well) + です (am/is) + <span class=\"particle\">か</span> (question marker)",
        "note": "Adding か makes it a question"
      },
      {
        "japanese": "日本人です<span class=\"particle\">か</span>",
        "romaji": "nihonjin desu ka",
        "english": "Are you Japanese?",
        "breakdown": "日本人 (Japanese person) + です (am/is) + <span class=\"particle\">か</span> (question marker)",
        "note": "か at the end = question"
      },
      {
        "japanese": "何です<span class=\"particle\">か</span>",
        "romaji": "nan desu ka",
        "english": "What is it?",
        "breakdown": "何 (what) + です (is) + <span class=\"particle\">か</span> (question marker)",
        "note": "Basic question structure"
      }
    ]
  },
  {
    "id": 3,
    "title": "Object Marking",
    "particle": "を (wo/o)",
    "particleExplanation": "Marks the direct object of an action",
    "phrases": [
      {
        "japanese": "水<span class=\"particle\">を</span>飲みます",
        "romaji": "mizu wo nomimasu",
        "english": "I drink water",
        "breakdown": "水 (water) + <span class=\"particle\">を</span> (object marker) + 飲みます (drink)",
        "note": "を marks 'water' as what is being drunk"
      },
      {
        "japanese": "本<span class=\"particle\">を</span>読みます",
        "romaji": "hon wo yomimasu",
        "english": "I read a book",
        "breakdown": "本 (book) + <span class=\"particle\">を</span> (object marker) + 読みます (read)",
        "note": "を shows 'book' is the object being read"
      },
      {
        "japanese": "日本語<span class=\"particle\">を</span>勉強します",
        "romaji": "nihongo wo benkyou shimasu",
        "english": "I study Japanese",
        "breakdown": "日本語 (Japanese language) + <span class=\"particle\">を</span> (object marker) + 勉強します (study)",
        "note": "を indicates Japanese is being studied"
      }
    ]
  },
  {
    "id": 4,
    "title": "Location and Directions",
    "particle": "に (ni)",
    "particleExplanation": "Indicates location, destination, or time",
    "phrases": [
      {
        "japanese": "学校<span class=\"particle\">に</span>行きます",
        "romaji": "gakkou ni ikimasu",
        "english": "I go to school",
        "breakdown": "学校 (school) + <span class=\"particle\">に</span> (destination marker) + 行きます (go)",
        "note": "に marks the destination"
      },
      {
        "japanese": "東京<span class=\"particle\">に</span>住んでいます",
        "romaji": "toukyou ni sundeimasu",
        "english": "I live in Tokyo",
        "breakdown": "東京 (Tokyo) + <span class=\"particle\">に</span> (location marker) + 住んでいます (live)",
        "note": "に shows where someone lives"
      },
      {
        "japanese": "朝<span class=\"particle\">に</span>起きます",
        "romaji": "asa ni okimasu",
        "english": "I wake up in the morning",
        "breakdown": "朝 (morning) + <span class=\"particle\">に</span> (time marker) + 起きます (wake up)",
        "note": "に marks specific time"
      }
    ]
  },
  {
    "id": 5,
    "title": "Possession and Existence",
    "particle": "の (no)",
    "particleExplanation": "Shows possession or connection between nouns",
    "phrases": [
      {
        "japanese": "私<span class=\"particle\">の</span>本",
        "romaji": "watashi no hon",
        "english": "My book",
        "breakdown": "私 (I/me) + <span class=\"particle\">の</span> (possessive) + 本 (book)",
        "note": "の connects the owner to the thing owned"
      },
      {
        "japanese": "日本<span class=\"particle\">の</span>食べ物",
        "romaji": "nihon no tabemono",
        "english": "Japanese food",
        "breakdown": "日本 (Japan) + <span class=\"particle\">の</span> (connector) + 食べ物 (food)",
        "note": "の shows the food is from/of Japan"
      },
      {
        "japanese": "先生<span class=\"particle\">の</span>名前",
        "romaji": "sensei no namae",
        "english": "Teacher's name",
        "breakdown": "先生 (teacher) + <span class=\"particle\">の</span> (possessive) + 名前 (name)",
        "note": "の links teacher to their name"
      }
    ]
  }
]

function load_alphabets() {
  const contentCard = document.querySelector('.content-card');
  contentCard.innerHTML = `<div class=alphabet-container><h2>Alphabet Practice</h2><div class=alphabet-toggle><button class="toggle-button active"data-type=hiragana>Hiragana</button> <button class=toggle-button data-type=katakana>Katakana</button></div><div class=alphabet-grid id=alphabetGrid></div></div>`;

  load_alphabet_content('hiragana');

  // Toggle Hiragana and Katakana
  document.querySelectorAll('.toggle-button').forEach(button => {

    button.addEventListener('click', (e) => {
      const element = e.target;
      document.querySelectorAll('.toggle-button').forEach(b => b.classList.remove('active'));
      element.classList.add('active');
      load_alphabet_content(element.dataset.type);
    });

  });
}

function load_alphabet_content(type) {
  let html = '';
  const grid = document.getElementById('alphabetGrid');
  const alphabetData = type === 'hiragana' ? HIRAGANA : KATAKANA;

  // Gojuon
  html += '<div class="section"><h3>Gojuon (Basic)</h3><div class="char-grid">';
  Object.keys(alphabetData.GOJUON).forEach(key => {
    // Not enough time to implement :(
    if (key === 'SOKUON') return;

    alphabetData.GOJUON[key].forEach((char, index) => {
      const romaji = alphabetData.ROMAJI.GOJUON[key][index];
      html += `<div class="character-card" data-char="${char}" data-romaji="${romaji}"><div class="front-char">${char}</div><div class="back-char">${romaji}</div></div>`;
    });
  });

  html += '</div></div>';

  // Dakuten
  html += '<div class="section"><h3>Dakuten</h3><div class="char-grid">';
  Object.keys(alphabetData.DAKUTEN).forEach(key => {
    alphabetData.DAKUTEN[key].forEach((char, index) => {
      const romaji = alphabetData.ROMAJI.DAKUTEN[key][index];
      html += `<div class="character-card" data-char="${char}" data-romaji="${romaji}"><div class="front-char">${char}</div><div class="back-char">${romaji}</div></div>`;
    });
  });

  html += '</div></div>';

  // Handakuten
  html += '<div class="section"><h3>Handakuten</h3><div class="char-grid">';
  Object.keys(alphabetData.HANDAKUTEN).forEach(key => {
    alphabetData.HANDAKUTEN[key].forEach((char, index) => {
      const romaji = alphabetData.ROMAJI.HANDAKUTEN[key][index];
      html += `<div class="character-card" data-char="${char}" data-romaji="${romaji}"><div class="front-char">${char}</div><div class="back-char">${romaji}</div></div>`;
    });
  });
  html += '</div></div>';

  grid.innerHTML = html;

  document.querySelectorAll('.character-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}

function loadLessonsContent() {
  let current_lesson_index = 0;
  const contentCard = document.querySelector('.content-card');
  contentCard.innerHTML = `<div class=lessons-container><h2>Particle Lessons</h2><div class=lesson-navigation><button id=prevLesson disabled>← Back</button> <span id=lessonCounter>Lesson 1 of 5</span> <button id=nextLesson>Next →</button></div><div class=lesson-content id=lessonContent></div></div>`;

  const create_lesson = (index) => {
    const lesson = LESSON_DATA[index];
    const content = document.getElementById('lessonContent');
    let html = `<div class=lesson-header><h3>${lesson.title}</h3><div class=particle-info><p class=particle-focus>Focus Particle: <span class=particle>${lesson.particle}</span><p class=particle-description>${lesson.particleExplanation}</div></div><div class=phrases-list>`;

    lesson.phrases.forEach(phrase => {
      html += `<div class=phrase-card><div class=phrase-japanese>${phrase.japanese}</div><div class=phrase-romaji>${phrase.romaji}</div><div class=phrase-english>${phrase.english}</div><div class=phrase-breakdown><strong>Breakdown:</strong> ${phrase.breakdown}</div><div class=phrase-note><strong>Note:</strong> ${phrase.note}</div></div>`;
    });

    html += '</div>';

    content.innerHTML = html;
    document.getElementById('lessonCounter').textContent = `Lesson ${index + 1} of ${LESSON_DATA.length}`;
    document.getElementById('prevLesson').disabled = index == 0;
    document.getElementById('nextLesson').disabled = index == LESSON_DATA.length - 1;
  }

  create_lesson(current_lesson_index);

  document.getElementById('prevLesson').addEventListener('click', () => {
    if (current_lesson_index > 0) {
      current_lesson_index--;
      create_lesson(current_lesson_index);
    }
  });
  document.getElementById('nextLesson').addEventListener('click', () => {
    if (current_lesson_index < LESSON_DATA.length - 1) {
      current_lesson_index++;
      create_lesson(current_lesson_index);
    }
  });
}


function main() {
  inject_site_content();

  set_listeners();
  set_card_listeners();
}
main();

const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
document.getElementById('lastModified').textContent = document.lastModified;