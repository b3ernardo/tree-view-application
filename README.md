# tree-view-application
Tree View Application that shows companies Assets

# Project Description
This project is a Tree View application for asset management, providing a hierarchical visualization of components, assets, and locations within a company. The dynamic tree structure displays asset and location hierarchies, with filtering capabilities to search for energy sensors and critical sensor statuses. Developed with Next.js for easy app routing and performance optimization, Zustand for state management, and React Query for data fetching and synchronization with the API. These are technologies I use regularly in my work and am highly familiar with, which is one of the reasons I chose them for this project. The application facilitates efficient navigation and filtering of asset hierarchies, enhancing the management and maintenance of company resources.

- [Next.js](https://nextjs.org/)
  - A powerful React framework for building server-rendered or statically exported React applications. It provides features like server-side rendering (SSR), static site generation (SSG), and API routes, making it ideal for creating high-performance and SEO-friendly web applications. Next.js enhances development efficiency with its built-in routing, fast refresh, and automatic code splitting.
- [React Query (TanStack Query)](https://tanstack.com/query/v3/):
  - A data-fetching and state management library for React that simplifies the process of fetching, caching, synchronizing, and updating server state in React applications. React Query abstracts away the complexities of managing server-side data and provides features such as automatic refetching, pagination, and optimistic updates, leading to a smoother user experience. It was used in conjunction with Axios, a popular HTTP client, to handle data requests and responses.
- [Zustand](https://zustand-demo.pmnd.rs/):
  - A lightweight and scalable state management solution for React. Zustand provides a simple API for managing global state and offers features like a minimalistic approach to state management and support for middleware. It allows for straightforward state updates and efficient re-renders, making it a popular choice for managing complex state in React applications.

- Additionally, I used Prettier and ESLint along with a series of plugins to enforce consistent code formatting and best practices. This helps to ensure clean, maintainable code, while preventing errors and improving the overall readability and structure of the project.

## Points of the project I would improve if I had more time...
- Testing: I would implement unit, integration, and end-to-end tests to ensure robust functionality and code coverage, targeting at least X% coverage. This would help in catching bugs early and maintaining the overall quality of the code.
- CSS Standardization: I would refine the CSS by applying stricter design standards and potentially integrating CSS libraries to improve maintainability and consistency across components.
- Data Fetching and Rendering Optimization: I would enhance the data fetching and rendering algorithms, particularly for handling large data sets, as I noticed some minor performance bottlenecks with large data sources, specifically in rendering the Locations.
- Component Refactoring: I would break down some of the larger components into smaller, more manageable pieces. Additionally, I would create custom hooks or utility functions to streamline logic and improve code reusability.
- Mock Data: I would mock additional non-existent data fields such as "Equipment Type" to better simulate real-world use cases and extend the application's functionality for testing and development purposes.

## How to Run the Application
Prerequisites
- Make sure you have Node.js installed. You can download and install it from the official website.
- A code editor like VS Code is recommended for easier project navigation.

1) Open a terminal and run the following command to clone the project repository:
```bash
git clone https://github.com/b3ernardo/tree-view-application.git
```
2) Install dependencies
```bash
npm install
```
3) Run the application in development mode
```bash
npm run dev
```
4) Access the application: `http://localhost:3000`
- You can also check the deployed app on Vercel: `https://tree-view-application.vercel.app/`

## Tree with filters
![filters](https://github.com/user-attachments/assets/495ff477-4458-4a41-903f-d60811db5cbb)
![filters2](https://github.com/user-attachments/assets/2f42c9e1-2fe9-41fa-b65d-0385a0d95b66)

## Tree without filters
![no-filter](https://github.com/user-attachments/assets/a6d70589-dc70-4fa8-b192-583706ed1aab)

## Responsivity
![mobile1](https://github.com/user-attachments/assets/3ae07db7-208e-49f8-840c-cc23fa09caf9)
![mobile2](https://github.com/user-attachments/assets/b38191be-b2da-44b1-b95b-3963bd8b9b84)
