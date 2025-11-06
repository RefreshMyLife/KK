import { Artist } from '@/app/types/artist';

export const mockArtists: Artist[] = [
  // Буква А
  { id: '1', name: 'Айвазовский Иван Константинович', birthYear: '1817', deathYear: '1900', slug: 'aivazovsky' },
  { id: '2', name: 'Архипов Абрам Ефимович', birthYear: '1862', deathYear: '1930', slug: 'arkhipov' },
  { id: '3', name: 'Антокольский Марк Матвеевич', birthYear: '1843', deathYear: '1902', slug: 'antokolsky' },

  // Буква Б
  { id: '4', name: 'Брюллов Карл Павлович', birthYear: '1799', deathYear: '1852', slug: 'bryullov' },
  { id: '5', name: 'Бенуа Александр Николаевич', birthYear: '1870', deathYear: '1960', slug: 'benois' },
  { id: '6', name: 'Борисов-Мусатов Виктор Эльпидифорович', birthYear: '1870', deathYear: '1905', slug: 'borisov-musatov' },
  { id: '7', name: 'Бакст Лев Самойлович', birthYear: '1866', deathYear: '1924', slug: 'bakst' },

  // Буква В
  { id: '8', name: 'Васнецов Виктор Михайлович', birthYear: '1848', deathYear: '1926', slug: 'vasnetsov-viktor' },
  { id: '9', name: 'Васнецов Аполлинарий Михайлович', birthYear: '1856', deathYear: '1933', slug: 'vasnetsov-apollinary' },
  { id: '10', name: 'Врубель Михаил Александрович', birthYear: '1856', deathYear: '1910', slug: 'vrubel' },
  { id: '11', name: 'Венецианов Алексей Гаврилович', birthYear: '1780', deathYear: '1847', slug: 'venetsianov' },
  { id: '12', name: 'Верещагин Василий Васильевич', birthYear: '1842', deathYear: '1904', slug: 'vereshchagin' },

  // Буква Г
  { id: '13', name: 'Ге Николай Николаевич', birthYear: '1831', deathYear: '1894', slug: 'ge' },
  { id: '14', name: 'Гончарова Наталья Сергеевна', birthYear: '1881', deathYear: '1962', slug: 'goncharova' },
  { id: '15', name: 'Грабарь Игорь Эммануилович', birthYear: '1871', deathYear: '1960', slug: 'grabar' },

  // Буква Д
  { id: '16', name: 'Дейнека Александр Александрович', birthYear: '1899', deathYear: '1969', slug: 'deineka' },
  { id: '17', name: 'Добужинский Мстислав Валерианович', birthYear: '1875', deathYear: '1957', slug: 'dobuzhinsky' },

  // Буква Е
  { id: '18', name: 'Ермолова Екатерина Петровна', birthYear: '1845', deathYear: '1925', slug: 'ermolova' },

  // Буква К
  { id: '19', name: 'Кандинский Василий Васильевич', birthYear: '1866', deathYear: '1944', slug: 'kandinsky' },
  { id: '20', name: 'Коровин Константин Алексеевич', birthYear: '1861', deathYear: '1939', slug: 'korovin' },
  { id: '21', name: 'Куинджи Архип Иванович', birthYear: '1842', deathYear: '1910', slug: 'kuindzhi' },
  { id: '22', name: 'Кустодиев Борис Михайлович', birthYear: '1878', deathYear: '1927', slug: 'kustodiev' },
  { id: '23', name: 'Крамской Иван Николаевич', birthYear: '1837', deathYear: '1887', slug: 'kramskoy' },

  // Буква Л
  { id: '24', name: 'Левитан Исаак Ильич', birthYear: '1860', deathYear: '1900', slug: 'levitan' },
  { id: '25', name: 'Ларионов Михаил Федорович', birthYear: '1881', deathYear: '1964', slug: 'larionov' },

  // Буква М
  { id: '26', name: 'Малевич Казимир Северинович', birthYear: '1879', deathYear: '1935', slug: 'malevich' },
  { id: '27', name: 'Машков Илья Иванович', birthYear: '1881', deathYear: '1944', slug: 'mashkov' },
  { id: '28', name: 'Маковский Константин Егорович', birthYear: '1839', deathYear: '1915', slug: 'makovsky' },

  // Буква Н
  { id: '29', name: 'Нестеров Михаил Васильевич', birthYear: '1862', deathYear: '1942', slug: 'nesterov' },

  // Буква П
  { id: '30', name: 'Перов Василий Григорьевич', birthYear: '1834', deathYear: '1882', slug: 'perov' },
  { id: '31', name: 'Петров-Водкин Кузьма Сергеевич', birthYear: '1878', deathYear: '1939', slug: 'petrov-vodkin' },
  { id: '32', name: 'Поленов Василий Дмитриевич', birthYear: '1844', deathYear: '1927', slug: 'polenov' },

  // Буква Р
  { id: '33', name: 'Репин Илья Ефимович', birthYear: '1844', deathYear: '1930', slug: 'repin' },
  { id: '34', name: 'Рерих Николай Константинович', birthYear: '1874', deathYear: '1947', slug: 'roerich' },

  // Буква С
  { id: '35', name: 'Серов Валентин Александрович', birthYear: '1865', deathYear: '1911', slug: 'serov' },
  { id: '36', name: 'Суриков Василий Иванович', birthYear: '1848', deathYear: '1916', slug: 'surikov' },
  { id: '37', name: 'Саврасов Алексей Кондратьевич', birthYear: '1830', deathYear: '1897', slug: 'savrasov' },

  // Буква Т
  { id: '38', name: 'Тропинин Василий Андреевич', birthYear: '1776', deathYear: '1857', slug: 'tropinin' },

  // Буква Ф
  { id: '39', name: 'Филонов Павел Николаевич', birthYear: '1883', deathYear: '1941', slug: 'filonov' },
  { id: '40', name: 'Федотов Павел Андреевич', birthYear: '1815', deathYear: '1852', slug: 'fedotov' },

  // Буква Ч
  { id: '41', name: 'Чюрленис Микалоюс Константинас', birthYear: '1875', deathYear: '1911', slug: 'ciurlionis' },

  // Буква Ш
  { id: '42', name: 'Шишкин Иван Иванович', birthYear: '1832', deathYear: '1898', slug: 'shishkin' },
  { id: '43', name: 'Шагал Марк Захарович', birthYear: '1887', deathYear: '1985', slug: 'chagall' },

  // Буква Щ
  { id: '44', name: 'Щедрин Сильвестр Феодосиевич', birthYear: '1791', deathYear: '1830', slug: 'shchedrin' },

  // Буква Ю
  { id: '45', name: 'Юон Константин Федорович', birthYear: '1875', deathYear: '1958', slug: 'yuon' },

  // Буква Я
  { id: '46', name: 'Яковлев Александр Евгеньевич', birthYear: '1887', deathYear: '1938', slug: 'yakovlev' },
];
