import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse; 
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.xk.util.PropertyUtil;
 
 
@Controller
@RequestMapping(value = "/DownloadServlet", produces = "text/html;charset=utf-8")
public class DownloadController extends HttpServlet {
 
 
	private static final long serialVersionUID = 1L;
	/**
	 * 获取服务器上的文件下载到客户端
	 * @param filePath
	 * @param request
	 * @param response
	 * @return
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping(value = "/Download.do")
	protected @ResponseBody void doGet(String filePath,HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());  
 
		String file_path = PropertyUtil.getProperty("file_path");
		File savePath = new File(file_path+date);
		if (!savePath.exists()) {
			savePath.mkdir();   
		}  
		String[] urlname = filePath.split("/");  
		int len = urlname.length-1;  
		String uname = urlname[len];
		try {  
			File file = new File(savePath+"/"+uname);
			if(file!=null && !file.exists()){  
				file.createNewFile();  
			}  
			OutputStream oputstream = new FileOutputStream(file);  
			URL url = new URL(filePath);  
			HttpURLConnection uc = (HttpURLConnection) url.openConnection();  
			uc.setDoInput(true); 
			uc.connect();  
			InputStream iputstream = uc.getInputStream();  
			byte[] buffer = new byte[4*1024];
			int byteRead = -1;     
			while((byteRead=(iputstream.read(buffer)))!= -1){  
				oputstream.write(buffer, 0, byteRead);  
			}  
			 // 取得文件的后缀名。
			String ext = uname.substring(uname.lastIndexOf(".") + 1).toUpperCase();
 
			
			oputstream.flush();    
			iputstream.close();  
			oputstream.close();  
			
			
	        InputStream inStream = new FileInputStream(savePath+"/"+uname);
	        InputStream fis = new BufferedInputStream(new FileInputStream(file));
            byte[] buffer2 = new byte[fis.available()];
            fis.read(buffer2);
            fis.close();
            response.reset();
            response.addHeader("Content-Disposition", "attachment;filename=" + new String(uname.getBytes()));
            response.addHeader("Content-Length", "" + file.length());
            OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            
            byte[] b = new byte[100];
            int len1;
            while ((len1 = inStream.read(b)) > 0)
                response.getOutputStream().write(b, 0, len1);
            inStream.close();
		
            toClient.write(buffer);
            toClient.flush();
            toClient.close();
            file.delete();
            savePath.delete();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
	}
}
