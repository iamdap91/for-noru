import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { ProductOptionsService } from './product-options.service';

@ApiTags('product-options')
@Controller('product-options')
export class ProductOptionsController {
  constructor(private readonly productOptionsService: ProductOptionsService) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productOptionsService.remove(+id);
  }
}
