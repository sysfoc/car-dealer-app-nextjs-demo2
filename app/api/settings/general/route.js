import dbConnect from "../../../lib/mongodb"
import GeneralSettings from "../../../models/settings/General"
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    
    const settings = await GeneralSettings.findOne();
    
    if (!settings) {
      const defaultSettings = {
        logo: "/logo.png",
        favicon: "/logo.png",
        top: {
          hideDarkMode: false,
          hideFavourite: false,
          hideLogo: false,
        },
        footer: {
          col1Heading: "",
          col2Heading: "",
          col3Heading: "",
        },
        recaptcha: {
          siteKey: "",
          status: "inactive",
        },
        analytics: {
          trackingId: "",
          status: "inactive",
        },
        cookieConsent: {
          message: "",
          buttonText: "ACCEPT",
          textColor: "#000000",
          bgColor: "#ffffff",
          buttonTextColor: "#ffffff",
          buttonBgColor: "#000000",
          status: "inactive",
        },
        themeColor: {
          darkModeBg: "#000000",
          darkModeText: "#ffffff",
        },
      };
      
return NextResponse.json({ settings: defaultSettings });
    }
    
return NextResponse.json({ settings });

  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    console.log('Received settings data:', body);
    
    let settings = await GeneralSettings.findOne();
    
    if (settings) {
      settings = await GeneralSettings.findOneAndUpdate(
        {},
        { 
          $set: {
            ...body,
            updatedAt: new Date()
          }
        },
        { 
          new: true, 
          runValidators: true 
        }
      );
    } else {
      settings = await GeneralSettings.create({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    console.log('Settings saved:', settings);
    
    return NextResponse.json({ 
      success: true, 
      settings,
      message: 'Settings saved successfully' 
    });
    
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save settings',
        details: error.message 
      },
      { status: 500 }
    );
  }
}