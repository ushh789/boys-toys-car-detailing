const apiUrl = 'http://boystoys.com.ua/price_list';
const localStorageKey = 'priceListData'; 
const expirationKey = 'priceListExpiration';

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    saveDataToLocalStorage(data);

    generateContent(data);
    initializeToggleLogic();
    openFirstCategory();
  } catch (error) {
    console.error('Помилка отримання даних:', error);

    const cachedData = getDataFromLocalStorage();
    if (cachedData) {
      generateContent(cachedData);
      initializeToggleLogic();
      openFirstCategory();
    }
  }
}

function saveDataToLocalStorage(data) {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
  localStorage.setItem(expirationKey, Date.now().toString()); }

function getDataFromLocalStorage() {
  const data = localStorage.getItem(localStorageKey);
  return data ? JSON.parse(data) : null;
}

function shouldFetchData() {
  const expiration = localStorage.getItem(expirationKey);
  if (!expiration) return true;

  const oneHour = 60 * 60 * 1000; 
  return Date.now() - parseInt(expiration, 10) > oneHour; }

function generateSafeId(text) {
    return text.replace(/'/g, '-'); }

function generateContent(data) {
  const categoriesContainer = document.getElementById('categories-list');
  const servicesContainer = document.getElementById('services-container');

  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = {};
    if (!acc[item.category][item.typeOfService]) acc[item.category][item.typeOfService] = [];
    acc[item.category][item.typeOfService].push(item);
    return acc;
  }, {});

  Object.keys(groupedData).forEach(category => {
    const safeCategoryId = generateSafeId(category);

    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category');
    categoryElement.innerHTML = `
      <span class="title">${category}</span>
      <span class="toggle" id="${safeCategoryId}-toggle">+</span>
    `;
    categoriesContainer.appendChild(categoryElement);

    const servicesList = document.createElement('ul');
    servicesList.classList.add('services');
    servicesList.id = `${safeCategoryId}-list`;
    servicesList.style.display = 'none';

    Object.keys(groupedData[category]).forEach(type => {
      const typeHeader = document.createElement('li');
      typeHeader.innerHTML = `<span class="type-of-service">${type}</span>`;
      servicesList.appendChild(typeHeader);

      groupedData[category][type].forEach(service => {
        const serviceItem = document.createElement('li');

        
        serviceItem.innerHTML = `
          <div class="service-details">
            <div class="service-name">${service.title}</div>
            <div class="service-price">${service.price}</div>
          </div>
          ${service.description ? `<div class="service-description">${service.description.replace(/\n/g, '<br>')}</div>` : ''}
        `;
        servicesList.appendChild(serviceItem);
      });
    });

    servicesContainer.appendChild(servicesList);
  });
}

let isFirstCategoryOpened = false;

function toggleList(category) {
    const list = document.getElementById(`${category}-list`);
    const toggle = document.getElementById(`${category}-toggle`);
    const categoryTitle = document.querySelector(`#${category}-toggle`).previousElementSibling;
    const allLists = document.querySelectorAll('.services');
    const allToggles = document.querySelectorAll('.toggle');
    const allCategoryTitles = document.querySelectorAll('.category .title');
    const allCategories = document.querySelectorAll('.category');
    const isMobile = window.innerWidth < 768;
  
    const isCurrentlyVisible = list.classList.contains('open');
  
    if (!isCurrentlyVisible) {
      allLists.forEach(lst => {
        lst.classList.remove('open');
        lst.style.display = 'none';
      });
  
      allToggles.forEach(tog => {
        tog.textContent = '+';
        tog.classList.remove('active');
      });
  
      allCategoryTitles.forEach(title => {
        title.style.color = '';
      });
  
      if (isMobile) {
        allCategories.forEach(cat => {
          if (cat.querySelector(`#${category}-toggle`) !== toggle) {
            cat.classList.add('hiding');
            setTimeout(() => {
              cat.style.display = 'none';
            }, 300);
          }
        });
      }
  
      list.style.display = 'block';
      setTimeout(() => {
        list.classList.add('open');
      }, 10);
  
      toggle.textContent = '-';
      toggle.classList.add('active');
      categoryTitle.style.color = 'var(--color-gray-400)';
    } else {
      list.classList.remove('open');
      toggle.classList.remove('active');
      toggle.textContent = '+';
      categoryTitle.style.color = '';
  
      setTimeout(() => {
        list.style.display = 'none';
        
        if (isMobile) {
          allCategories.forEach(cat => {
            cat.style.display = 'flex';
            cat.classList.remove('hiding');
            requestAnimationFrame(() => {
              cat.style.opacity = '1';
            });
          });
        }
      }, 300);
    }

     if (!isFirstCategoryOpened) {
      isFirstCategoryOpened = true; 
    } else {
      const priceListSection = document.getElementById('price-list');
      priceListSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function initializeToggleLogic() {
  const categories = document.querySelectorAll('.category');
  categories.forEach(category => {
    category.addEventListener('click', function () {
      const categoryId = generateSafeId(
        this.querySelector('.toggle').id.split('-')[0]
      );
      toggleList(categoryId);
    });
  });

  const allLists = document.querySelectorAll('.services');
  allLists.forEach(list => {
    list.style.display = 'none';
  });

  window.addEventListener('resize', function () {
    const isMobile = window.innerWidth <= 768;
    const allCategories = document.querySelectorAll('.category');

    if (!isMobile) {
      allCategories.forEach(cat => {
        cat.style.display = 'flex';
      });
    }
  });
}

function openFirstCategory() {
  const firstCategory = document.querySelector('.category');
  if (firstCategory) {
    const categoryId = generateSafeId(firstCategory.querySelector('.toggle').id.split('-')[0]);
    toggleList(categoryId);
  }
}

function initializeApp() {
  if (shouldFetchData()) {
    fetchData();
  } else {
    const cachedData = getDataFromLocalStorage();
    if (cachedData) {
      generateContent(cachedData);
      initializeToggleLogic();
      openFirstCategory();
    } else {
      fetchData();
    }
  }
}
initializeApp();
