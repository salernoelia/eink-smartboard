import os
import requests

# Function to download SVG file
def download_svg(base_url, file_number, save_dir):
    url = f"{base_url}{file_number}.svg"
    response = requests.get(url)
    
    if response.status_code == 200:
        file_path = os.path.join(save_dir, f"{file_number}.svg")
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded: {url}")
    else:
        print(f"Failed to download: {url}, status code: {response.status_code}")

# Main function to iterate and download files
def main():
    base_url = "https://www.meteoschweiz.admin.ch/static/resources/weather-symbols/"
    save_dir = "svg_files"
    os.makedirs(save_dir, exist_ok=True)

    # Define the range of files to download
    start_number = 1
    end_number = 100  # Adjust this to the desired end number

    for i in range(start_number, end_number + 1):
        download_svg(base_url, i, save_dir)

if __name__ == "__main__":
    main()
