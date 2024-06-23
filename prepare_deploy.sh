echo "Preparing for deployment..."

git add package-lock.json package.json
git commit -m "Committing changes to package files" || true 
git push origin master || true  

echo "Preparation complete."