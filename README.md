## **How to run the server:**

- For the server, go into the server folder

  ```
  cd server
  ```
- From there, run the requirements.txt
  ```
  pip install -r requirements.txt
  ```
- In the .env file (it's hidden) make sure to provision your Cloudinary keys, can get free cloudinary keys on the cloudinary website!
  ```
  CLOUDINARY_API_SECRET="SECRET"
  CLOUDINARY_API_KEY="KEY"
  CLOUDINARY_API_NAME="NAME"
  ```
- To run the API, make sure to traverse into the API folder 
  ```
  cd api
  ```
- Run flask application
```
python main.py
```
