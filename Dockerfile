# Use an official Python runtime as a parent image
FROM django

# Set the working directory to /app
WORKDIR /IskmeTest

# Copy the current directory contents into the container at /app
ADD . /IskmeTest



# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt



# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME Environment

# Run app.py when the container launches
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
