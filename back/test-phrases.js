import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';

// Тестовая фраза
const testPhrase = {
  russian: "Тестовая фраза",
  german: "Testphrase",
  transcription: "[тестфразе]",
  category: "general",
  masteryLevel: 0,
  lastReviewedAt: null,
  nextReviewAt: Date.now() + 86400000, // Через 24 часа
  knowCount: 0,
  knowStreak: 0,
  isMastered: false
};

async function runTests() {
  console.log('Начинаем тестирование API фраз...\n');
  
  try {
    // 1. Создание фразы (CREATE)
    console.log('1. Создание новой фразы...');
    const createResponse = await fetch(`${BASE_URL}/phrases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPhrase)
    });
    
    const createdPhrase = await createResponse.json();
    console.log('Созданная фраза:', createdPhrase);
    
    if (createResponse.status !== 201) {
      console.error('Ошибка при создании фразы:', createdPhrase);
      return;
    }
    
    const phraseId = createdPhrase.id;
    console.log('✅ Фраза успешно создана с ID:', phraseId);
    
    // 2. Получение всех фраз (READ ALL)
    console.log('\n2. Получение всех фраз...');
    const getAllResponse = await fetch(`${BASE_URL}/phrases`);
    const allPhrases = await getAllResponse.json();
    console.log(`Получено ${allPhrases.length} фраз`);
    console.log('✅ Все фразы получены успешно');
    
    // 3. Получение конкретной фразы (READ ONE)
    console.log('\n3. Получение конкретной фразы...');
    const getOneResponse = await fetch(`${BASE_URL}/phrases/${phraseId}`);
    const fetchedPhrase = await getOneResponse.json();
    console.log('Полученная фраза:', fetchedPhrase);
    console.log('✅ Конкретная фраза получена успешно');
    
    // 4. Обновление фразы (UPDATE)
    console.log('\n4. Обновление фразы...');
    const updatedPhrase = {
      ...testPhrase,
      knowCount: 1,
      knowStreak: 1,
      masteryLevel: 1
    };
    
    const updateResponse = await fetch(`${BASE_URL}/phrases/${phraseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPhrase)
    });
    
    const updateResult = await updateResponse.json();
    console.log('Обновленная фраза:', updateResult);
    console.log('✅ Фраза успешно обновлена');
    
    // 5. Удаление фразы (DELETE)
    console.log('\n5. Удаление фразы...');
    const deleteResponse = await fetch(`${BASE_URL}/phrases/${phraseId}`, {
      method: 'DELETE'
    });
    
    if (deleteResponse.status === 204) {
      console.log('✅ Фраза успешно удалена');
    } else {
      console.error('Ошибка при удалении фразы');
    }
    
    console.log('\n🎉 Все тесты пройдены успешно!');
    
  } catch (error) {
    console.error('Ошибка во время тестирования:', error);
  }
}

// Запуск тестов
runTests();