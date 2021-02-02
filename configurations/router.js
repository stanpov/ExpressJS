const userController = require('../controllers/user');
const courseController = require('../controllers/course');
const registerValidator = require('../validators/registerValidator');
const courseValidator = require('../validators/courseValidator')
const isAuth = require('../middlewares/isAuth')

module.exports = (app)=>{

    app.get('/',userController.getHome)
    app.get('/register',isAuth(false),userController.getRegister);
    app.get('/login',isAuth(false),userController.getLogin);
    app.post('/register',isAuth(false),registerValidator,userController.postRegister);
    app.post('/login',isAuth(false),registerValidator,userController.postLogin);
    app.get('/logout',isAuth(true),userController.getLogOut);

    app.get('/create',isAuth(true),courseController.getCreateCourse);
    app.post('/create',isAuth(true),courseValidator,courseController.postCreateCourse);
    app.get('/details/:id',isAuth(true),courseController.getCourseDetails);
    app.get('/edit/:id',isAuth(true),courseController.getEditCourse);
    app.post('/edit/:id',isAuth(true),courseValidator,courseController.postEditCourse);
    app.get('/delete/:id',isAuth(true),courseController.getDelete);
    app.get('/enroll/:id',isAuth(true),courseController.postEnrolled);
}