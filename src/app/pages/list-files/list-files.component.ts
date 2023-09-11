import { NotExpr } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, Renderer2, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FileStructure } from 'src/app/interfaces/file-structure';
import { FilesService } from 'src/app/services/files.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit, OnDestroy {

  @ViewChild('downloadLink', { static: false })
  downloadLink!: ElementRef;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  public fileList!: FileStructure[];

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  public showSpinner: boolean = false;

  constructor(
    private fileService: FilesService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  initialize() {
    this.showSpinner = true;
    this.fileService.getFileList()
      .subscribe({
        next: (files) => {
          console.log(files);
          this.fileList = files;
          this.dtTrigger.next(files);
          this.showSpinner = false;
        },
        error: (error) => {
          Swal.fire('Error', error, 'error');
        }
      });
  }

  downloadFile(file: FileStructure) {
    if (this._verifyFileStatus(file)) {
      this.showSpinner = true;
      this.fileService.downloadFile(file.name).subscribe({
        next: (url: any) => {
          this.downloadLink.nativeElement.href = url;
          this.downloadLink.nativeElement.click();
          this.showSpinner = false;
        }
      });
    }
  }

  async renameFile(file: FileStructure) {

    if (this._verifyFileStatus(file)) {
      const { value: newName } = await Swal.fire({
        title: 'Enter your new file name',
        input: 'text',
        inputLabel: 'File name',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to define a name!'
          }

          return '';
        }
      })

      if (newName) {
        this.showSpinner = true;
        let nameSetted = this._setName(newName);
        this.fileService.renameFile(nameSetted, file.name).subscribe({
          next: () => {
            Swal.fire('File renamed', 'File renamed successfully', 'success');
            this.reloadList();//Reload file list to see the change
            this.showSpinner = false;
          },
          error: (error) => {
            this.showSpinner = false;
            Swal.fire('Error', error, 'error');
          }
        });
      }
    }
  }

  private _verifyFileStatus(file: FileStructure) {
    if (file.status == 'unzipped') {
      Swal.fire('Notice', 'You can not do this operation because the file is not zipped', 'info');
      return false;
    }

    return true;
  }

  private _setName(nameFile: string) {
    if (nameFile.includes('.')) {
      let temp = nameFile.split('.');
      return `${temp.slice(0, temp.length - 1).join('.')}.zip`;
    } else {
      return `${nameFile}.zip`;
    }
  }

  uploadFile(event: any) {
    if (event.target.files[0]) {
      let formData = new FormData();
      formData.append('file', event.target.files[0]);
      this.showSpinner = true;
      this.fileService.addFile(formData).subscribe({
        next: () => {
          Swal.fire('Success', 'File uploaded successfully', 'success');
          this.reloadList();//Reload tthe file list to see the change
          this.showSpinner = false;
        },
        error: (error) => {
          Swal.fire('Error', error, 'error');
          this.showSpinner = false;
        }
      });
    }
  }

  reloadList() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.initialize();
    });
  }
}
