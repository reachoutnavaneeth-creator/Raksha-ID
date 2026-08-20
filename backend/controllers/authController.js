const supabase = require("../config/supabase");

const checkUser = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("phone", phone);

    if (error) throw error;

    return res.json({
      success: true,
      exists: data.length > 0,
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  checkUser,
};