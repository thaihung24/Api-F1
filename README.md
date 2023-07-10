# Api-F1

`*` Giả sử tên các tay đua và các đội sẽ không trùng nhau.</p>
`*` Cơ sở dữ liêu có 3 bảng,</p>
`*` Drivers : Lưu danh sách các tay đua tham gia theo từng năm</p>
`*` Races : Lưu danh sách các thống kê phụ theo từng năm ở từng địa điểm tổ chức thi (fastest laps, pit stop summary , starting grid)</p>
`*` RaceResults : Lưu kết quả thi đấu của các tay đua theo từng năm ở từng địa điểm</p>

`*` Endpoint: Có dạng link/:thamso/:thamso</p>
`*` ==> Người dùng phải đảm bảo truyền đúng params nếu truyền sai thi api vẫn có thể thực thi nhưng sẽ trả về kết quả khác mong đợi.</p>
`*` Ví dụ https://api-f1-i33j.onrender.com/api/raceResults/:year/:country/:nameRace (api này Tìm kết quả của giải đua phụ nameRace theo năm year ở một nước country. )</p>
`*` Đảm bảo rằng bạn truyền đúng tham số cần truyền theo thứ tự</p>
`*` ví dụ https://api-f1-i33j.onrender.com/api/raceResults/2023/Monaco/fastest-laps</p>
`*` Nếu người dùng không truyền year</p>
(https://api-f1-i33j.onrender.com/api/raceResults/Monaco/fastest-laps)</p>
`*` Thì api vẫn không báo lỗi vì tồn lại một Endpoint có dạng https://api-f1-i33j.onrender.com/api/raceResults/:year/:country</p>
`*` Lúc này app sẽ tự động hiểu year = Monaco country = fastest-laps</p>
`*` Và vẫn sẽ gọi đến api # Tìm kết quả của giải đua theo năm ở một nước.</p>

<b> Link deploy</b> : https://api-f1-i33j.onrender.com </p>

<b>Link postmand</><a href="https://bold-desert-303323.postman.co/workspace/My-Workspace~088d016d-ad13-468f-8a92-2022a05cb2a0/collection/22353900-d58c1c19-49d9-4105-87c4-422a22559c92?action=share&creator=22353900">Ấn vào để đi dến postman</a> </p>

<h4>One day one hour --- Chi tiết công việc<h4></p>

`******************************************** - BẮT ĐẦU - ********************************************`</p>

`*` 23/6/2023 Tìm hiểu website thiết kế data, </p>

`*` 24/6/2023 setup project</p>

`*` 25/6/2023 Call api của web F1 để xem cấu trúc html để bóc tách</p>

`*` 26/6/2023 Tìm hiểu quy luật theo từng năm "Mỗi năm sẽ có các cuộc đua ở các nước , ở mỗi nước sẽ có các giải như : fastest laps, pit stop summary , starting grid ,... ".</p>

`*` 27/6/2023 Code bóc tách html sử dụng puppeteer</p>

`*` 28/9/2023 Kiểm tra data phát hiện quy luật đưa ra ngày 26/6/2023 không đúng với mọi năm ==> tìm hiểu lại quy luật giải đấu.</p>

`*` 1/7/2023 Tiến hành code fix craw data sau kho craw và check thì vẫn có một số data bị thiếu</p>

`*` 2/7/2023</p>
[</p>

https://api-f1-i33j.onrender.com/api/drivers/:year</p>

# api xem danh sách tất cả các tay đua theo năm.</p>

]</p>

`*` 3/7/2023</p>
`*********** - BẮT ĐẦU 3/7 - ***********`</p>
[</p>

<b> Tên tay đua phải được xử lý trước khi truyền vào.Tất cả các khoản trắng phải được lượt bỏ và thay bằng "-" Ví dụ : Max Verstappen VER ==> Max-Verstappen-VER </b></p>

https://api-f1-i33j.onrender.com/api/drivers/:year/:name</p>

# Tìm kết quả thi đấu của từng tay đua theo năm</p>

https://api-f1-i33j.onrender.com/api/teams/:year</p>

# Tìm kết quả thi đấu của các team tham gia theo năm,</p>

<b> Tên tay team phải được xử lý trước khi truyền vào.Tất cả các khoản trắng phải được lượt bỏ và thay bằng "-" Ví dụ : Red Bull Racing Honda ==> Red-Bull-Racing-Honda </b> </p>

https://api-f1-i33j.onrender.com/api/:year/:team</p>

# Tìm kết quả thi đấu của 1 team theo năm</p>

https://api-f1-i33j.onrender.com/api/raceResults/:year</p>

# Tìm kết quả của giải đua theo năm ở các nước.</p>

https://api-f1-i33j.onrender.com/api/raceResults/:year/:country</p>

# Tìm kết quả của giải đua theo năm ở một nước.</p>

]</p>
`*********** - BẮT ĐẦU 3/7 - ***********`</p>
`*` 5/7/2023</p>
`*********** - BẮT ĐẦU 5/7 - ***********`</p>
[</p>
update api</p>

https://api-f1-i33j.onrender.com/api/races/:country</p>

# Tìm danh sách các giải đua phụ theo năm ở từng địa điểm đua</p>

<b> Khi call lấy được danh sách giải phụ ở một nước, người dùng truyền key của giải phụ muốn xem vào nameRace.<b></p>

https://api-f1-i33j.onrender.com/api/raceResults/:year/:country/:nameRace</p>

# Tìm kết quả của giải đua phụ theo năm ở một nước. </p>

https://api-f1-i33j.onrender.com/api/raceResults/fastestLap/:year</p>

# Kết quả vòng nhanh nhất theo năm DHL FASTEST LAP AWARD</p>

Tích hợp redis tối ưu trải nghiệm người dùng.</p>
]
`*********** - KẾT THÚC 5/7 - ***********`</p>

- 7/7/2023 deploy to render</p>
  `******************************************** - KẾT THÚC - ********************************************`</p>
  Cách triển khai :</p>
  B1 : Đảm bảo máy đã được cài đặt node :"https://hocwebchuan.com/tutorial/guide/nodejs/install_nodejs.php"</p>
  B2 :Tải source code : git clone "https://github.com/thaihung24/Api-F1.git"</p>
  B3 : Tải các gói cài đặt : npm i</p>
  B4 : Ở thư mục gốc (cùng cấp với src) tạo file có tên ".env" và đảm bảo trong .env chứa</p>

######

DB_USERNAME="ThaisHungw"</p>
DB_PASSWORD="hungngubo123"</p>
DB_NAME="F1-dev"</p>
Redis = true</p>
REDIS_URL = "rediss://red-cij8i659aq01qqgvnmvg:Qt6fDi5D75NPcbGgVzgHDlM50pGfrvHI@singapore-redis.render.com:6379"</p>

######

<b> Redis=true nếu muốn tích hơp redis để caching data</b></p>

<b> REDIS_URL link connect với redis để caching data tối ưu trãi nghiệm người dùng</b></p>

<b> Đảm bảo rằng redis được cài trên máy</b></p>

<b> Nếu chưa</b></p>

B4.1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</p>
B4.2 brew install redis</p>
B4.3 brew services start redis</p>
B4.4 redis-cli ping</p>

B5 : Chạy ứng dụng ở môi trường dev : npm run dev</p>

Ứng dụng sẽ được chạy dưới port 3000:</p>
Để sử dụng api anh/chị có thể sử dụng các api được liệt kê phía trên</p>
thay https://api-f1-i33j.onrender.com thành http://localhost:3000</p>
