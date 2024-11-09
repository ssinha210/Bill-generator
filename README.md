# Bill Generator

## Overview

The **Bill Generator** is a full-stack web application that allows users to select products, view their prices, and generate a bill in PDF format. The system consists of a backend server built with Node.js, Express, and MongoDB to store product and category data. The frontend is a React-based web application that interacts with the backend, allowing users to select products, add them to a bill, and generate a downloadable PDF of the bill.

### Features:
- Select a category and view available products.
- Add products to a bill with customizable quantities.
- Edit the quantity of products in the bill.
- Calculate the total price.
- Generate a PDF of the bill.
- Easy-to-use UI with product listing, quantity input, and total display.

## Demo

![Demo of the Bill Generator App](https://github.com/ssinha210/Bill-generator/blob/main/demo/bill.gif)

The above GIF demonstrates the basic functionality of the application: selecting a category, adding products, editing quantities, and generating the final bill in PDF format.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **PDF Generation**: jsPDF
- **Styling**: TailwindCSS for styling

## Setup Instructions

Follow these steps to get the Bill Generator project up and running on your local machine.

### Prerequisites

1. **Node.js** (version 14.x or later)
2. **MongoDB** (Local or Cloud Database)
3. **npm** (Node Package Manager)

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/ssinha210/Bill-generator.git
cd Bill-generator
