import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   userId: string;
}
