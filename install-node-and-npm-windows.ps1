# Specify the desired Node.js and npm versions
$nodeVersion = "18.14.2"
$npmVersion = "9.7.1"

# Install the specified Node.js version using Node Version Manager for Windows (nvm-windows)
nvm install $nodeVersion

# Use the specified Node.js version
nvm use $nodeVersion

# Install the specified npm version globally
npm install -g npm@$npmVersion

# Print Node.js and npm versions for verification
node -v
npm -v
