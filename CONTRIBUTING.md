# Contribution Guide

This guide explains the process for contributing to the SwiftPulseHub project. Please follow the steps below to ensure a smooth workflow.

## Step 1: Clone the GitHub Repository
1. Open Terminal or Git Bash on your local machine.
2. Navigate to the directory where you want to clone the repository.
3. Clone the repository using the following command:
   ```bash
   git clone https://github.com/Noobmaster169/SwiftPulseHub.git
   ```

## Step 2: Create Your Own Branch
1. Navigate to the repository directory:
   ```bash
   cd SwiftPulseHub
   ```
2. Create and switch to your own branch:
   ```bash
   git checkout -b <your-branch-name>
   ```
   Replace `<your-branch-name>` with your name or identifier (e.g., `Mario`).

## Step 3: Work on Your Branch
- Make changes to the code as needed in your branch.

## Step 4: Commit Your Changes
1. Stage the changes:
   ```bash
   git add .
   ```
2. Commit the changes:
   ```bash
   git commit -m "Your commit message"
   ```

## Step 5: Pull the Latest Changes from `dev` Branch and Handle Conflicts
1. Switch to the `dev` branch:
   ```bash
   git checkout dev
   ```
2. Pull the latest changes from the remote `dev` branch:
   ```bash
   git pull origin dev
   ```
3. Switch back to your own branch:
   ```bash
   git checkout <your-branch-name>
   ```
4. Merge the latest `dev` branch into your branch:
   ```bash
   git merge dev
   ```
   - If there are merge conflicts, resolve them in your code editor.
   - After resolving conflicts, stage the changes:
     ```bash
     git add .
     ```
   - Commit the resolved changes:
     ```bash
     git commit -m "Resolved merge conflicts"
     ```

## Step 6: Push Your Code to `dev` Branch
1. Switch to the `dev` branch:
   ```bash
   git checkout dev
   ```
2. Merge your branch into `dev`:
   ```bash
   git merge <your-branch-name>
   ```
3. Push the changes to the remote `dev` branch:
   ```bash
   git push origin dev
   ```

## Important Notes:
- Always pull the latest `dev` branch and resolve any conflicts before pushing your code.
- Only the Product Owner is allowed to push changes from `dev` to `main`.

By following these steps, we ensure that all contributions are integrated smoothly into the project.
