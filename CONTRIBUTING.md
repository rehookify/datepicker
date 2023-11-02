# Contributing to `@rehookify/datepicker`

As the creators and maintainers of this project, we want to ensure that **@rehookify/datepicker** lives and continues to grow and evolve. We would like to encourage everyone to help and support this library by contributing.

## Code contributions

Here is a quick guide to doing code contributions to the library.

1. Fork and clone the repo to your local machine `git clone https://github.com/YOUR_GITHUB_USERNAME/datepicker`

2. Create a new branch from `master` with a meaningful name for a new feature or an issue you want to work on: `git checkout -b your-meaningful-branch-name`

3. Install pnpm and packages by running:

   > npm i -g pnpm

4. Install pnpm and packages by running:

   > pnpm i

5. Run all packages in dev mode:

   > pnpm i

6. If you've added a code that should be tested, ensure the test suite still passes.

   > pnpm test

7. Try to write some unit tests to cover as much of your code as possible.

8. If you need to test add e2e test for you feature please create page in `./packages/examples/` and write tests in `./packages/examples-e2e`

9. Push your branch: `git push -u origin your-meaningful-branch-name`

10. Submit a pull request to the upstream **@rehookify/datepicker** repository.

11. Choose a descriptive title and describe your changes briefly.

## Coding style

Please follow the coding style of the project. **@rehookify/datepicker** uses eslint and prettier. If possible, enable their respective plugins in your editor to get real-time feedback.

Please name all new files in kebab-case: `my-new-shiny-feature.ts`;

Please follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for your contributions.

## License

By contributing your code to the **@rehookify/datepicker** GitHub repository, you agree to license your contribution under the MIT license.
