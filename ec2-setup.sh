#!/bin/bash

# Update system packages
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install NVM (Node Version Manager)
echo "Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js v22.17.0
echo "Installing Node.js v22.17.0..."
nvm install 22.17.0
nvm use 22.17.0
nvm alias default 22.17.0

# Verify Node.js installation
echo "Node.js version:"
node -v
echo "NPM version:"
npm -v

# Install PM2 globally
echo "Installing PM2..."
npm install -g pm2

# Set up PM2 to start on boot
echo "Setting up PM2 startup..."
pm2 startup
sudo env PATH=$PATH:/home/$USER/.nvm/versions/node/v22.17.0/bin pm2 startup systemd -u $USER --hp /home/$USER

# Create backend directory if it doesn't exist
echo "Creating backend directory..."
mkdir -p ~/backend

# Install rsync if not already installed
echo "Installing rsync..."
sudo apt install -y rsync

echo "Backend setup complete!" 