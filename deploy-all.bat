cd frontend
npm run build
cd ..

cd functions
npm run build
cd ..

firebase deploy --only functions,hosting
