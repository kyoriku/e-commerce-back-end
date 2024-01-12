# E-commerce Back End

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description
E-commerce Back End is a comprehensive project designed to empower internet retail companies with a robust back end infrastructure. In the dynamic landscape of e-commerce, where convenience and efficiency are paramount, this application leverages cutting-edge technologies to seamlessly integrate an [Express.js](https://expressjs.com/) API with [Sequelize](https://sequelize.org/) for interacting with a [MySQL](https://www.mysql.com/) database. The primary objective is to enhance the back end of an e-commerce website, addressing the needs of a manager at an internet retail company. This solution aims to provide a competitive edge by equipping companies with the latest technologies necessary for effective competition in the e-commerce sector.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
1. Clone the repository to your local machine.
    ```bash
    git clone https://github.com/kyoriku/e-commerce-back-end.git
    ```
2. Navigate to the project directory.
    ```bash
    cd e-commerce-back-end
    ```
3. Install the required dependencies.
    ```bash
    npm install
    ```

## Usage
1. Create a `.env` file with the following variables and fill in your database credentials
    ``` bash
    DB_NAME='your_database_name'
    DB_USER='your_database_user'
    DB_PASSWORD='your_database_password'
    ```
2. Create the database with [MySQL Workbench](https://www.mysql.com/products/workbench/) or [MySQL Shell](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-getting-started.html) using the `schema.sql` file. 
    ``` bash
    CREATE DATABASE ecommerce_db;
    ```
3. Seed the database.
    ``` bash
    npm run seed
    ```
4. Start the server.
    ``` bash
    npm start
    ```
5. Use [Insomnia](https://insomnia.rest/download) to test API routes.

### Screenshots
- Get all products:

![GetAllProducts](assets/images/e-commerce-insomnia1.png)

- Get a single product by id:

![GetOneProduct](assets/images/e-commerce-insomnia2.png)

- Create a new product:

![CreateNewProduct](assets/images/e-commerce-insomnia3.png)

- Update a product by id:

![UpdateProduct](assets/images/e-commerce-insomnia4.png)

- Delete a product by id:

![DeleteProduct](assets/images/e-commerce-insomnia5.png)

## License
This application is covered by the [MIT](https://opensource.org/licenses/MIT) license.

## Contributing
If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your branch.
5. Submit a pull request, explaining your changes.

## Questions
If you have any questions, please contact [kyoriku](https://github.com/kyoriku) or email devkyoriku@gmail.com.