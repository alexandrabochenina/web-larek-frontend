# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
Базовый код

1. Интерфейс IItem 
Интерфейс нашего товара со всеми необходимыми данными:
- id: string
- image: string
- category: string
- title: string
- description: string
- price: number

2. Класс ItemPresenter 
Класс, который непосредственно отображает карточку-товара на странице
Поля класса:
- itemTemplate: HTMLTemplateElement
- item: IItem

Методы класса:
- buyItem() 
- deleteItem() 
- closeItem()
- renderItem() 

Купить товар (положить в корзину), удались товар из корзины, закрыть товар, добавить новый template для товара

3. Класс Cart
Класс, описывающий корзину товаров
Полем класса является массив карточек товаров Items: Item[]

К методам класса относятся:
- delete()
- checkout()
- close()

Товар из корзины можно удалить, оформить заказ и закрыть попап с товарами

4. Класс Order
Класс, для введения адрес доставки в попап и выбора формы оплаты
Поля класса:

- payment: string (выбор способа оплаты)
- address: string

Метод, который должен присутствовать в данном классе
-nextPopup() - для переключения на следующий класс заполнения данных

5. Класс Contacts 
Класс для введения данных в попап (почта и номер телефона)
- email: string,
- phone: string

А также метод:
- pay() для оплаты заказа и вывода попапа "Заказ оформлен"

6. Класс Catalog
Содержащий в себе массив всех карточек

<img src="./assets/README.jpeg">