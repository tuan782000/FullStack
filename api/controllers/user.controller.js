import bcrypt from 'bcrypt';
import User from '../models/User.model.js';

const updateInfo = async (req, res) => {
    const { password, ...updateFields } = req.body;
    let hashedPassword;

    try {
        // Nếu mật khẩu có trong body, mã hóa nó
        if (password) {
            const saltRounds = 10; // Độ mạnh của mã hóa, có thể tùy chỉnh
            hashedPassword = await bcrypt.hash(password, saltRounds);
            updateFields.password = hashedPassword; // Thêm mật khẩu đã mã hóa vào updateFields
        }

        // Cập nhật thông tin người dùng, bao gồm mật khẩu và các trường khác
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        updatedUser.password = undefined; // Đảm bảo không trả về password

        // Trả về thông tin người dùng đã được cập nhật
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            message: 'An error occurred while updating the user',
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        // Tìm và xóa người dùng theo ID
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Trả về thông báo đã xóa thành công
        res.status(200).json({
            message: 'User deleted successfully',
            user: deletedUser
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            message: 'An error occurred while deleting the user',
            error: error.message
        });
    }
};

const getUser = async (req, res) => {
    try {
        // Tìm người dùng theo ID từ params
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Loại bỏ mật khẩu trước khi trả về thông tin người dùng
        user.password = undefined;

        // Trả về thông tin người dùng
        res.status(200).json({
            message: 'User found successfully',
            user
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({
            message: 'An error occurred while getting the user',
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    const query = req.query.new; // Kiểm tra nếu có query parameter "new" để lọc người dùng mới nhất
    // {{LEARN_NODE_JS}}/api/users/list?new=true

    try {
        let users;

        // Nếu có query "new", chỉ lấy 5 người dùng mới nhất, nếu không lấy tất cả người dùng
        if (query) {
            users = await User.find().sort({ _id: -1 }).limit(5); // Lấy 5 người dùng mới nhất
        } else {
            users = await User.find(); // Lấy tất cả người dùng
        }

        // Loại bỏ mật khẩu và trả về dữ liệu
        users.forEach(user => {
            user.password = undefined;
        });

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while fetching users',
            error: err.message
        });
    }
};

// const getAllUsers = async (req, res) => {
//     try {
//         // Lấy tất cả người dùng từ cơ sở dữ liệu
//         const users = await User.find();

//         // Loại bỏ mật khẩu từ mỗi người dùng trong danh sách
//         users.forEach(user => {
//             user.password = undefined;
//         });

//         // Trả về danh sách người dùng
//         res.status(200).json({
//             message: 'Users fetched successfully',
//             users
//         });
//     } catch (error) {
//         console.error('Error getting users:', error);
//         res.status(500).json({
//             message: 'An error occurred while getting users',
//             error: error.message
//         });
//     }
// };

// STATS
// lấy thống kê số lượng người dùng được tạo ra trong năm qua, chia theo từng tháng. Cụ thể, GET /stats sẽ trả về số lượng người dùng mới theo tháng trong vòng 12 tháng qua.
const getStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' }
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
};

/*
$match: Lọc tất cả người dùng có createdAt (ngày tạo tài khoản) lớn hơn hoặc bằng lastYear. Điều này sẽ chỉ lấy những người dùng được tạo trong vòng 12 tháng qua.
$project: Tạo một trường mới month để lấy tháng từ trường createdAt. Sử dụng $month để trích xuất tháng từ ngày.
$group: Nhóm các bản ghi theo tháng (_id: '$month'). Sau đó, sử dụng $sum: 1 để đếm số lượng người dùng trong mỗi tháng.
*/

export { updateInfo, deleteUser, getUser, getAllUsers, getStats };
