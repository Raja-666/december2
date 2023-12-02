const profileModel = require('../models/Profileschema')

// const Collection = require('../models/Profileschema');

    const handleUpdateProfile = async (req, res) => {
    try {

        const filePath = req.files;

        console.log('filePath', filePath) // [{} , {} ]

        const { userName, Bio, userEmail, website } = req.body;
        // const profileImg = req.files['profileImg'][0].filename;
        // const coverImg = req.files['coverImg'][0].filename;
        
        const profileData = new profileModel({
            profileImg: filePath,
            coverImg: filePath,
            userName,
            Bio,
            userEmail,
            website
          });

          await profileData.save();

        res.status(200).json({ success: true, data: 'colData', message: 'Collection List' });


    } catch (error) {
        console.log('error', error)


    }
}




module.exports = { handleUpdateProfile };

