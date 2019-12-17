import ajax from './ajax'
const BASE_URL = ''

export const reqUsers = (that)=>{
    return ajax(BASE_URL+'/xml-backend/users.php',{},'GET',that)
}

export const reqSearchUser = (username,that)=>{
    return ajax(BASE_URL+'/xml-backend/users.php',{username},'GET',that)
}

export const reqAddUser = (username,password,role,that)=>{
    return ajax(BASE_URL+'/xml-backend/users.php',{username,password,role},'POST',that)
}

export const reqDeleteUser = (username,that)=>{
    return ajax(BASE_URL+'/xml-backend/users.php',{username},'DELETE',that)
}

export const reqUpdateUser = (username,password,role,that)=>{
    return ajax(BASE_URL+'/xml-backend/users.php',{username,password,role},'PUT',that)
}

export const reqStudents = (that)=>{
    return ajax(BASE_URL+'/xml-backend/student.php',{},'GET',that)
}
export const reqSearchStudents = (stuNo,that)=>{
    return ajax(BASE_URL+'/xml-backend/student.php',{stuNo},'GET',that)
}
export const reqAddStudent = (stuNo,stuName,birthday,jiguan,address,phone,date,stuClass,that)=>{
    return ajax(BASE_URL+'/xml-backend/student.php',{stuNo,stuName,birthday,jiguan,address,phone,date,class:stuClass},'POST',that)
}
export const reqDeleteStudent = (stuNo,that)=>{
    return ajax(BASE_URL+'/xml-backend/student.php',{stuNo},'DELETE',that)
}
export const reqUpdateStudent = (updateDto,that)=>{
    return ajax(BASE_URL+'/xml-backend/student.php',updateDto,'PUT',that)
}


export const reqScores = (that)=>{
    return ajax(BASE_URL+'/xml-backend/score.php',{},'GET',that)
}

export const reqSearchScores = (stuNo,that)=>{
    return ajax(BASE_URL+'/xml-backend/score.php',{stuNo},'GET',that)
}

export const reqAddScore = (stuNo,course,score,teacher,that)=>{
    return ajax(BASE_URL+'/xml-backend/score.php',{stuNo,course,score,teacher},'POST',that)
}

export const reqDeleteScore = (stuNo,course,that)=>{
    return ajax(BASE_URL+'/xml-backend/score.php',{stuNo,course},'DELETE',that)
}

export const reqUpdateScore = (stuNo,course,score,teacher,that)=>{
    return ajax(BASE_URL+'/xml-backend/score.php',{stuNo,course,score,teacher},'PUT',that)
}

export const reqLogin = (username,password,that)=>{
    return ajax(BASE_URL+'/xml-backend/login.php',{username,password},'POST',that)
}



