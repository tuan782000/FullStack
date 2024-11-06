import jwt from 'jsonwebtoken';

// Viêt middlesware để chặn các thành phần không có phận sự sử dụng các chức năng

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token; // token thì có dạng Bearer AbCxSjsan - AbCxSjsan nó là token

    // kiểm tra có token tồn tại không
    if (authHeader) {
        // chặt khúc Bearer ra lấy phần token không về
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json('Token is not valid');
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json('You are not authenticated!');
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that');
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('You are not allowed to do that');
        }
    });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
