var mongoose =  require('mongoose'),
    Schema =    mongoose.Schema,
    init =      require('./init'),

    //构建数据结构
    userSchema = new Schema({
        name: String,
        password: String,
    }),

    articleSchema = new Schema({
        title: String,
        date: Date,
        content: String,
    }),

    linkSchema = new Schema({
        name: String,
        href: String,
    }),

    //将schema发布为数据模型
    User = mongoose.model('User',userSchema),
    Article = mongoose.model('Article',articleSchema),
    Link = mongoose.model('Link',linkSchema),

    //初始化数据
    admin = new User(init.admin),
    article = new Article(init.article),
    link = new Link(init.link)

    mongoose.connect('mongodb://localhost/myblog');
    mongoose.set('debug',true);

    var db = mongoose.connection;

    db.on('error',function(){
        console.log('error');
    })
     //如果打开数据库 并将默认数据写入数据库，初始化数据
    db.once('open',function(){
        // console.log('opened');
        User.find(null, function(err,doc){
            if(err){
                console.log(err);
            }
            else{
                if(!doc[0]){
                    link.save(function(err){
                        if(err) return console.log(err);
                    })

                    admin.save(function(err){
                        if(err) return console.log(err);
                    })

                    article.save(function(err){
                        if(err) return console.log(err);
                    })
                }
            }
        })
    })

module.exports ={
	User:User,
    Article:Article,
    Link:Link
}