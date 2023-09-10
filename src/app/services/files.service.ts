import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { FileStructure } from '../interfaces/file-structure';
import { map } from 'rxjs';
import { FileResponse } from '../interfaces/file-response';
import { FileUrlResponse } from '../interfaces/file-url-response';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private httpClient: HttpClient) { }

  getFileList() {
    return this.httpClient.get<FileResponse>(`${BASE_URL}/files/get_files`)
      .pipe(
        map((resp: FileResponse) => {
          return resp.files;
        })
      );
  }

  addFile(file: FormData) {
    return this.httpClient.post(`${BASE_URL}/files/upload_file`, file);
  }

  renameFile(destFilename: string, srcFilename: string) {
    return this.httpClient.post(`${BASE_URL}/files/rename`, {destFilename, srcFilename});
  }

  downloadFile(fileName: string) {
    return this.httpClient.post<FileUrlResponse>(`${BASE_URL}/files/file_url`, {fileName})
      .pipe(
        map((resp: FileUrlResponse) => {
          return resp.url;
        })
      );
  }
}
