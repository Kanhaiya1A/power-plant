# power-plant

1. Get all employees :
url: https://luminous-kringle-f75746.netlify.app/.netlify/functions/index/get/getAllEmployees
req: get

2. Add employee :
url: https://luminous-kringle-f75746.netlify.app/.netlify/functions/index/create/createEmployee
req: post
input: (body in row json): 
{
    "emp_id": "276",
    "emp_name": "kanhaiya",
    "emp_username": "kanhaiya276",
    "emp_password": "12345"
}

3. employee login:
url: https://luminous-kringle-f75746.netlify.app/.netlify/functions/index/employeelogin/login
req: post
input: (body in form-data):
emp_username:ravi12
emp_password:12345

4. Get check in assign:
url: https://luminous-kringle-f75746.netlify.app/.netlify/functions/index/get/getCheckInAssign
req: post
input: (form-data in body):
emp_id: 1 or 2

5. get check out assign:
url: https://luminous-kringle-f75746.netlify.app/.netlify/functions/index/get/getCheckOutAssign
input: (form-data in body):
emp_id: 1 or 2

6.  add check in track
url: https://luminous-kringle-f75746.netlify.app/.netlify/functions/index/create/createCheckInTrack
req: post
input: (row json in body):
{
    "emp_id": "2",
    "task_id": "2",
    "remarks": "remarks1",
    "status": "true"
}


7.  add check out track
url: https://luminous-kringle-f75746.netlify.app/.netlify/functions/index/create/createCheckOutTrack
req: post
input: (row json in body):
{
    "emp_id": "2",
    "task_id": "2",
    "remarks": "remarks1",
    "status": "true"
}
