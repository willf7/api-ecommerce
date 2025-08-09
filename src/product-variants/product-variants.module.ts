import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsController } from './product-variants.controller';

@Module({
  controllers: [ProductVariantsController],
  providers: [ProductVariantsService],
})
export class ProductVariantsModule {}
