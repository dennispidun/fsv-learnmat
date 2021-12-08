import { IsString } from 'class-validator';

export class ListMaterialDto {
  @IsString()
  public name: string;

  @IsString() 
  public etag: string;
}
