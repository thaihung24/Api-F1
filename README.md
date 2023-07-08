# Api-F1

Giả sử tên các tay đua và các đội sẽ không trùng nhau.
Cơ sở dữ liêu có 3 bảng,
Drivers : Lưu danh sách các tay đua tham gia theo từng năm
Races : Lưu danh sách các thống kê phụ theo từng năm ở từng địa điểm tổ chức thi (fastest laps, pit stop summary , starting grid)
RaceResults : Lưu kết quả thi đấu của các tay đua theo từng năm ở từng địa điểm

Endpoint: Có dạng link/:thamso/:thamso
==> Người dùng phải đảm bảo truyền đúng params nếu truyền sai thi api vẫn có thể thực thi nhưng sẽ trả về kết quả khác mong đợi.
ví dụ https://api-f1-i33j.onrender.com/api/raceResults/:year/:country/:nameRace (api này Tìm kết quả của giải đua phụ nameRace theo năm year ở một nước country. )
Đảm bảo rằng bạn truyền đúng tham số cần truyền theo thứ tự
ví dụ https://api-f1-i33j.onrender.com/api/raceResults/2023/Monaco/fastest-laps
Nếu người dùng không truyền year
(https://api-f1-i33j.onrender.com/api/raceResults/Monaco/fastest-laps)
thì api vẫn không báo lỗi
vì tồn lại một Endpoint có dạng https://api-f1-i33j.onrender.com/api/raceResults/:year/:country
Lúc này app sẽ tự động hiểu year = Monaco country = fastest-laps
Và vẫn sẽ gọi đến api # Tìm kết quả của giải đua theo năm ở một nước.#

# Link deploy : https://api-f1-i33j.onrender.com

# link postmand : https://bold-desert-303323.postman.co/workspace/My-Workspace~088d016d-ad13-468f-8a92-2022a05cb2a0/collection/22353900-d58c1c19-49d9-4105-87c4-422a22559c92?action=share&creator=22353900

One day one hour

- 23/6/2023 Tìm hiểu website thiết kế data,

- 24/6/2023 setup project

- 25/6/2023 Call api của web F1 để xem cấu trúc html để bóc tách

- 26/6/2023 Tìm hiểu quy luật theo từng năm "Mỗi năm sẽ có các cuộc đua ở các nước , ở mỗi nước sẽ có các giải như : fastest laps, pit stop summary , starting grid ,... ".

- 27/6/2023 Code bóc tách html sử dụng puppeteer

- 28/9/2023 Kiểm tra data phát hiện quy luật đưa ra ngày 26/6/2023 không đúng với mọi năm ==> tìm hiểu lại quy luật giải đấu.

- 1/7/2023 Tiến hành code fix craw data sau kho craw và check thì vẫn có một số data bị thiếu

- 2/7/2023
  [

# api xem danh sách tất cả các tay đua theo năm.

https://api-f1-i33j.onrender.com/api/drivers/:year

]

- 3/7/2023
  [

# Tìm kết quả thi đấu của từng tay đua theo năm

# Tên tay đua phải được xử lý trước khi truyền vào.Tất cả các khoản trắng phải được lượt bỏ và thay bằng "-" Ví dụ : Max Verstappen VER ==> Max-Verstappen-VER

https://api-f1-i33j.onrender.com/api/drivers/:year/:name

# Tìm kết quả thi đấu của các team tham gia theo năm,

https://api-f1-i33j.onrender.com/api/teams/:year

# Tìm kết quả thi đấu của 1 team theo năm

# Tên tay team phải được xử lý trước khi truyền vào.Tất cả các khoản trắng phải được lượt bỏ và thay bằng "-" Ví dụ : Red Bull Racing Honda ==> Red-Bull-Racing-Honda

https://api-f1-i33j.onrender.com/api/:year/:team

# Tìm kết quả của giải đua theo năm ở các nước.

https://api-f1-i33j.onrender.com/api/raceResults/:year

# Tìm kết quả của giải đua theo năm ở một nước.

https://api-f1-i33j.onrender.com/api/raceResults/:year/:country

]

- 5/7/2023
  [
  update api

# Tìm danh sách các giải đua phụ theo năm ở từng địa điểm đua

https://api-f1-i33j.onrender.com/api/races/:country

# Tìm kết quả của giải đua phụ theo năm ở một nước. Khi call lấy được danh sách giải phụ ở một nước, người dùng truyền key của giải phụ muốn xem vào nameRace.

https://api-f1-i33j.onrender.com/api/raceResults/:year/:country/:nameRace

# Kết quả vòng nhanh nhất theo năm DHL FASTEST LAP AWARD

https://api-f1-i33j.onrender.com/api/raceResults/fastestLap/:year

Tích hợp redis tối ưu trải nghiệm người dùng.
]

- 7/7/2023 deploy to render

Cách triển khai :
B1 : Đảm bảo máy đã được cài đặt node :"https://hocwebchuan.com/tutorial/guide/nodejs/install_nodejs.php"
B2 :Tải source code : git clone "https://github.com/thaihung24/Api-F1.git"
B3 : Tải các gói cài đặt : npm i
B4 : Ở thư mục gốc (cùng cấp với src) tạo file có tên ".env" và đảm bảo trong .env chứa

######

DB_USERNAME="ThaisHungw"
DB_PASSWORD="hungngubo123"
DB_NAME="F1-dev"
Redis = true
REDIS_URL = "rediss://red-cij8i659aq01qqgvnmvg:Qt6fDi5D75NPcbGgVzgHDlM50pGfrvHI@singapore-redis.render.com:6379"

######

# Redis=true nếu muốn tích hơp redis để caching data

# REDIS_URL link connect với redis để caching data tối ưu trãi nghiệm người dùng

# Đảm bảo rằng redis được cài trên máy

# Nếu chưa

B4.1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
B4.2 brew install redis
B4.3 brew services start redis
B4.4 redis-cli ping

B5 : Chạy ứng dụng ở môi trường dev : npm run dev

Ứng dụng sẽ được chạy dưới port 3000:
Để sử dụng api anh/chị có thể sử dụng các api được liệt kê phía trên
thay https://api-f1-i33j.onrender.com thành http://localhost:3000
