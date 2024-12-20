# Image-to-AVIF Converter

A simple and efficient Node.js script to convert images (PNG, JPG, JPEG, and
WEBP) into the AVIF format with optimized compression and high-quality output.
This project utilizes the `sharp` library for image processing.

## Features

- Supports PNG, JPG, JPEG, and WEBP formats.
- Converts images to AVIF format with adjustable quality.
- Processes multiple images in parallel for faster conversions.
- Automatically creates the output directory if it doesn’t exist.
- Logs detailed conversion progress and errors.

## Folder Structure

```
└── 📁image-to-avif
    └── 📁src
        └── 📁images
            └── //your images
        └── 📁output
            └── //result images
        └── index.js
    └── .gitignore
    └── package-lock.json
    └── package.json
    └── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/)

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd image-to-avif
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Add images to the `src/images` directory.
2. Run the script:
   ```bash
   npm start
   ```
3. The converted AVIF images will be saved in the `src/output` directory.

## Configuration

- **Quality Setting**: The AVIF quality can be adjusted in `src/index.js` by
  modifying the `quality` variable:
  ```javascript
  const quality = 50; // Adjust quality (0-100)
  ```
- **Parallel Processing**: The script uses the number of available CPU cores for
  optimal performance. You can override this by changing the `maxThreads`
  variable:
  ```javascript
  const maxThreads = 4; // Example: limit to 4 threads
  ```

## Example Output

Input:

```
src/images/
├── default.png
```

Output:

```
src/output/
├── default.avif
```

## License

This project is licensed under the MIT License. Feel free to use and modify it
as needed.

## Acknowledgments

- [Sharp Documentation](https://sharp.pixelplumbing.com/)

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue
to report bugs or suggest improvements.
